const { pgTable, pgEnum, uuid, varchar, text, timestamp, index } = require('drizzle-orm/pg-core');
const { users } = require('./users');

const inquiryStatus = pgEnum('inquiry_status', ['new', 'in_progress', 'replied', 'archived']);

const inquiries = pgTable('inquiries', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 150 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 35 }),
  organization: varchar('organization', { length: 150 }),
  service: varchar('service', { length: 100 }).notNull(),
  budget: varchar('budget', { length: 50 }),
  message: text('message').notNull(),
  status: inquiryStatus('status').notNull().default('new'),
  claimedByUserId: uuid('claimed_by_user_id').references(() => users.id, { onDelete: 'set null' }),
  claimedAt: timestamp('claimed_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index('inquiries_status_created_at_idx').on(table.status, table.createdAt),
  index('inquiries_service_idx').on(table.service),
]);

module.exports = { inquiries, inquiryStatus };
