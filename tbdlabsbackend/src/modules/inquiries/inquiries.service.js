const {
  and,
  asc,
  count,
  desc,
  eq,
  ilike,
  inArray,
  or,
} = require('drizzle-orm');
const { db } = require('../../db/client');
const { inquiries, inquiryReplies, users } = require('../../db/schema');
const emailService = require('../../services/email.service');

function filtersFor({ status, service, search }) {
  const filters = [];
  if (status) filters.push(eq(inquiries.status, status));
  if (service) filters.push(eq(inquiries.service, service));
  if (search) {
    const escapedSearch = search.replace(/[\\%_]/g, '\\$&');
    const pattern = `%${escapedSearch}%`;
    filters.push(or(
      ilike(inquiries.name, pattern),
      ilike(inquiries.email, pattern),
      ilike(inquiries.phone, pattern),
      ilike(inquiries.organization, pattern),
      ilike(inquiries.message, pattern),
    ));
  }
  return filters;
}

function publicReply(reply) {
  return {
    id: reply.id,
    inquiryId: reply.inquiryId,
    senderUserId: reply.senderUserId,
    senderName: reply.senderName,
    recipientEmail: reply.recipientEmail,
    subject: reply.subject,
    messageBody: reply.messageBody,
    sentAt: reply.sentAt,
  };
}

async function listInquiries(query) {
  const { page, limit } = query;
  const filters = filtersFor(query);
  let rowsQuery = db.select({
    inquiry: inquiries,
    claimedBy: { id: users.id, name: users.name },
  }).from(inquiries).leftJoin(users, eq(inquiries.claimedByUserId, users.id));
  let totalQuery = db.select({ total: count() }).from(inquiries);
  if (filters.length) {
    rowsQuery = rowsQuery.where(and(...filters));
    totalQuery = totalQuery.where(and(...filters));
  }

  const [rows, [totals]] = await Promise.all([
    rowsQuery.orderBy(desc(inquiries.createdAt)).limit(limit).offset((page - 1) * limit),
    totalQuery,
  ]);
  const total = Number(totals.total);
  return {
    inquiries: rows.map(({ inquiry, claimedBy }) => ({ ...inquiry, claimedBy: claimedBy?.id ? claimedBy : null })),
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
}

async function listReplies(executor, inquiryId) {
  const rows = await executor.select({
    id: inquiryReplies.id,
    inquiryId: inquiryReplies.inquiryId,
    senderUserId: inquiryReplies.senderUserId,
    senderName: users.name,
    recipientEmail: inquiryReplies.recipientEmail,
    subject: inquiryReplies.subject,
    messageBody: inquiryReplies.messageBody,
    sentAt: inquiryReplies.sentAt,
  }).from(inquiryReplies)
    .innerJoin(users, eq(inquiryReplies.senderUserId, users.id))
    .where(eq(inquiryReplies.inquiryId, inquiryId))
    .orderBy(asc(inquiryReplies.sentAt));
  return rows;
}

async function getInquiry(id) {
  const [row] = await db.select({
    inquiry: inquiries,
    claimedBy: { id: users.id, name: users.name },
  }).from(inquiries).leftJoin(users, eq(inquiries.claimedByUserId, users.id))
    .where(eq(inquiries.id, id)).limit(1);
  if (!row) return null;
  const replies = await listReplies(db, id);
  return {
    ...row.inquiry,
    claimedBy: row.claimedBy?.id ? row.claimedBy : null,
    replies,
  };
}

async function getClaimDetails(executor, claimUserId) {
  if (!claimUserId) return null;
  const [claimer] = await executor.select({ id: users.id, name: users.name })
    .from(users).where(eq(users.id, claimUserId)).limit(1);
  return claimer || null;
}

async function claimInquiry(id, user) {
  return db.transaction(async (tx) => {
    const [inquiry] = await tx.select().from(inquiries)
      .where(eq(inquiries.id, id)).for('update').limit(1);
    if (!inquiry) return { statusCode: 404, error: { code: 'INQUIRY_NOT_FOUND', message: 'Inquiry not found.' } };
    if (inquiry.status === 'replied') {
      return { statusCode: 409, error: { code: 'INQUIRY_ALREADY_REPLIED', message: 'A replied inquiry cannot be claimed.' } };
    }
    if (inquiry.status === 'archived') {
      return { statusCode: 409, error: { code: 'INQUIRY_ARCHIVED', message: 'Unarchive this inquiry before claiming it.' } };
    }

    if (user.claimed) {
      if (inquiry.claimedByUserId && inquiry.claimedByUserId !== user.id) {
        const claimedBy = await getClaimDetails(tx, inquiry.claimedByUserId);
        return { statusCode: 409, error: { code: 'INQUIRY_CLAIMED', message: 'Another staff member has claimed this inquiry.' }, data: { claimedBy, claimedAt: inquiry.claimedAt } };
      }
      const claimedAt = inquiry.claimedAt || new Date();
      const [updated] = await tx.update(inquiries).set({
        status: 'in_progress',
        claimedByUserId: user.id,
        claimedAt,
        updatedAt: new Date(),
      }).where(eq(inquiries.id, id)).returning();
      return { statusCode: 200, data: { inquiry: { ...updated, claimedBy: { id: user.id, name: user.name } } } };
    }

    if (inquiry.claimedByUserId && inquiry.claimedByUserId !== user.id && user.role !== 'superadmin') {
      const claimedBy = await getClaimDetails(tx, inquiry.claimedByUserId);
      return { statusCode: 409, error: { code: 'CLAIM_OWNER_REQUIRED', message: 'Only the claimant or a superadmin can release this inquiry.' }, data: { claimedBy, claimedAt: inquiry.claimedAt } };
    }

    const [updated] = await tx.update(inquiries).set({
      status: 'new',
      claimedByUserId: null,
      claimedAt: null,
      updatedAt: new Date(),
    }).where(eq(inquiries.id, id)).returning();
    return { statusCode: 200, data: { inquiry: { ...updated, claimedBy: null } } };
  });
}

async function replyToInquiry(id, sender) {
  return db.transaction(async (tx) => {
    const [inquiry] = await tx.select().from(inquiries)
      .where(eq(inquiries.id, id)).for('update').limit(1);
    if (!inquiry) return { statusCode: 404, error: { code: 'INQUIRY_NOT_FOUND', message: 'Inquiry not found.' } };
    if (inquiry.status === 'replied') {
      const replies = await listReplies(tx, id);
      return {
        statusCode: 409,
        error: { code: 'INQUIRY_ALREADY_REPLIED', message: 'A reply has already been sent for this inquiry.' },
        data: { inquiryId: id, status: inquiry.status, replies },
      };
    }
    if (inquiry.status === 'archived') {
      return { statusCode: 409, error: { code: 'INQUIRY_ARCHIVED', message: 'Unarchive this inquiry before replying.' } };
    }
    if (inquiry.claimedByUserId && inquiry.claimedByUserId !== sender.id) {
      const claimedBy = await getClaimDetails(tx, inquiry.claimedByUserId);
      return { statusCode: 409, error: { code: 'INQUIRY_CLAIMED', message: 'Another staff member has claimed this inquiry.' }, data: { claimedBy, claimedAt: inquiry.claimedAt } };
    }

    const subject = sender.subject || 'TBD Labs — response to your inquiry';
    try {
      await emailService.sendStaffReply({
        to: inquiry.email,
        staffName: sender.name,
        subject,
        messageBody: sender.messageBody,
      });
    } catch (error) {
      const deliveryError = new Error('Reply email delivery failed.');
      deliveryError.code = 'REPLY_EMAIL_FAILED';
      deliveryError.cause = error;
      throw deliveryError;
    }

    const [reply] = await tx.insert(inquiryReplies).values({
      inquiryId: inquiry.id,
      senderUserId: sender.id,
      recipientEmail: inquiry.email,
      subject,
      messageBody: sender.messageBody,
    }).returning();
    const claimedAt = inquiry.claimedAt || new Date();
    await tx.update(inquiries).set({
      status: 'replied',
      claimedByUserId: sender.id,
      claimedAt,
      updatedAt: new Date(),
    }).where(eq(inquiries.id, inquiry.id));

    return {
      statusCode: 201,
      data: {
        reply: { ...publicReply({ ...reply, senderName: sender.name }) },
        inquiry: { id: inquiry.id, status: 'replied', claimedBy: { id: sender.id, name: sender.name }, claimedAt },
      },
    };
  });
}

async function updateInquiryStatus(id, status) {
  const result = await db.update(inquiries).set({
    status,
    claimedByUserId: null,
    claimedAt: null,
    updatedAt: new Date(),
  }).where(and(eq(inquiries.id, id), inArray(inquiries.status, ['new', 'in_progress', 'archived'])))
    .returning();
  if (result[0]) return { inquiry: { ...result[0], claimedBy: null } };

  const [current] = await db.select({ id: inquiries.id, status: inquiries.status })
    .from(inquiries).where(eq(inquiries.id, id)).limit(1);
  if (!current) return { statusCode: 404, error: { code: 'INQUIRY_NOT_FOUND', message: 'Inquiry not found.' } };
  return { statusCode: 409, error: { code: 'INQUIRY_STATUS_LOCKED', message: 'A replied inquiry cannot be reopened or archived.' }, data: { inquiry: current } };
}

module.exports = { listInquiries, getInquiry, claimInquiry, replyToInquiry, updateInquiryStatus };
