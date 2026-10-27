const { pgTable, integer, boolean, uuid, timestamp, check } = require('drizzle-orm/pg-core');
const { sql } = require('drizzle-orm');
const { users } = require('./users');

const systemSettings = pgTable('system_settings', {
  id: integer('id').primaryKey().default(1),
  contactEmailNotificationsEnabled: boolean('contact_email_notifications_enabled').notNull().default(true),
  updatedBy: uuid('updated_by').references(() => users.id, { onDelete: 'set null' }),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [check('system_settings_singleton_id', sql`${table.id} = 1`)]);

module.exports = { systemSettings };
