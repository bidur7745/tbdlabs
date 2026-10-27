const { pgTable, uuid, varchar, text, timestamp } = require('drizzle-orm/pg-core');
const { inquiries } = require('./inquiries');
const { users } = require('./users');

const inquiryReplies = pgTable('inquiry_replies', {
  id: uuid('id').primaryKey().defaultRandom(),
  inquiryId: uuid('inquiry_id').notNull().references(() => inquiries.id, { onDelete: 'cascade' }),
  senderUserId: uuid('sender_user_id').notNull().references(() => users.id, { onDelete: 'restrict' }),
  recipientEmail: varchar('recipient_email', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 255 }).notNull(),
  messageBody: text('message_body').notNull(),
  sentAt: timestamp('sent_at', { withTimezone: true }).notNull().defaultNow(),
});

module.exports = { inquiryReplies };
