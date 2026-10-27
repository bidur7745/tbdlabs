const { pgTable, uuid, varchar, text, boolean, timestamp, pgEnum } = require('drizzle-orm/pg-core');

const userRole = pgEnum('user_role', ['superadmin', 'staff']);

const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 120 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: userRole('role').notNull().default('staff'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

module.exports = { users, userRole };
