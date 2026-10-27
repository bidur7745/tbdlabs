const { eq, and, inArray } = require('drizzle-orm');
const { db } = require('../../db/client');
const { inquiries, systemSettings, users } = require('../../db/schema');
const emailService = require('../../services/email.service');

async function createContactInquiry(input) {
  const [settings] = await db.select({ enabled: systemSettings.contactEmailNotificationsEnabled })
    .from(systemSettings).where(eq(systemSettings.id, 1)).limit(1);
  const notificationsEnabled = settings?.enabled ?? true;

  let recipients = [];
  if (notificationsEnabled) {
    recipients = await db.select({ email: users.email })
      .from(users)
      .where(and(eq(users.isActive, true), inArray(users.role, ['superadmin', 'staff'])))
      .then((rows) => rows.map(({ email }) => email));
  }

  const [inquiry] = await db.insert(inquiries).values(input).returning({
    id: inquiries.id,
    name: inquiries.name,
    email: inquiries.email,
    phone: inquiries.phone,
    organization: inquiries.organization,
    service: inquiries.service,
    budget: inquiries.budget,
    message: inquiries.message,
    createdAt: inquiries.createdAt,
  });

  const deliveries = [
    ['client-confirmation', () => emailService.sendClientConfirmation({ to: inquiry.email, name: inquiry.name })],
  ];
  if (notificationsEnabled && recipients.length) {
    deliveries.push(['staff-alert', () => emailService.sendStaffInquiryAlert({ recipients, inquiry })]);
  }

  const results = await Promise.allSettled(deliveries.map(([, deliver]) => deliver()));
  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      const [type] = deliveries[index];
      console.error('Inquiry email delivery failed.', {
        inquiryId: inquiry.id,
        type,
        code: result.reason?.code || 'EMAIL_DELIVERY_FAILED',
      });
    }
  });

  return { id: inquiry.id, emailDelivery: results.map((result) => result.status) };
}

module.exports = { createContactInquiry };
