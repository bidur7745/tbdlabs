const bcrypt = require('bcryptjs');
const { eq, desc, and, sql } = require('drizzle-orm');
const { db } = require('../../db/client');
const { users } = require('../../db/schema');

function publicStaff(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

async function listStaff() {
  const rows = await db.select({
    id: users.id,
    name: users.name,
    email: users.email,
    role: users.role,
    isActive: users.isActive,
    createdAt: users.createdAt,
    updatedAt: users.updatedAt,
  }).from(users).where(eq(users.role, 'staff')).orderBy(desc(users.createdAt));
  return rows;
}

async function createStaff({ name, email, password }) {
  const passwordHash = await bcrypt.hash(password, 12);
  const [created] = await db.insert(users).values({
    name,
    email,
    passwordHash,
    role: 'staff',
    isActive: true,
    mustChangePassword: true,
  }).returning();
  return publicStaff(created);
}

async function updateStaffStatus(id, isActive) {
  const changes = { isActive, updatedAt: new Date() };
  if (!isActive) changes.tokenVersion = sql`${users.tokenVersion} + 1`;
  const [updated] = await db.update(users)
    .set(changes)
    .where(and(eq(users.id, id), eq(users.role, 'staff')))
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      isActive: users.isActive,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    });
  if (!updated) return null;
  return updated;
}

async function deleteStaffAccount(id) {
  await db.delete(users).where(and(eq(users.id, id), eq(users.role, 'staff')));
}

module.exports = { listStaff, createStaff, updateStaffStatus, deleteStaffAccount };
