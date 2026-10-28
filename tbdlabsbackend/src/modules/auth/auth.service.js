const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { eq, sql } = require('drizzle-orm');
const { db } = require('../../db/client');
const { users } = require('../../db/schema');
const { env } = require('../../config/env');
const { JWT_OPTIONS } = require('../../middleware/auth');

const INVALID_CREDENTIALS = 'Invalid email or password.';
const DUMMY_PASSWORD_HASH = bcrypt.hashSync('invalid-login-attempt', 12);

function toPublicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    mustChangePassword: user.mustChangePassword,
    createdAt: user.createdAt,
  };
}

function createAccessToken(user) {
  return jwt.sign(
    { ver: user.tokenVersion },
    env.JWT_SECRET,
    {
      algorithm: 'HS256',
      issuer: JWT_OPTIONS.issuer,
      audience: JWT_OPTIONS.audience,
      subject: user.id,
      expiresIn: env.JWT_EXPIRES_IN,
    },
  );
}

function permissionsFor(role) {
  if (role === 'superadmin') return ['inquiries:read', 'staff:manage', 'settings:manage'];
  return ['inquiries:read', 'inquiries:claim', 'inquiries:reply', 'inquiries:status'];
}

async function login(email, password) {
  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  const passwordMatches = await bcrypt.compare(password, user?.passwordHash || DUMMY_PASSWORD_HASH);
  if (!user || !user.isActive || !passwordMatches) {
    const error = new Error(INVALID_CREDENTIALS);
    error.statusCode = 401;
    error.code = 'INVALID_CREDENTIALS';
    throw error;
  }

  const token = createAccessToken(user);

  return {
    user: toPublicUser(user),
    token,
    tokenType: 'Bearer',
    expiresIn: env.JWT_EXPIRES_IN,
  };
}

async function getCurrentUser(userId) {
  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!user) return null;
  return { ...toPublicUser(user), permissions: permissionsFor(user.role) };
}

async function changePassword(userId, currentPassword, newPassword) {
  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!user || !user.isActive || !(await bcrypt.compare(currentPassword, user.passwordHash))) {
    const error = new Error('Current password is incorrect.');
    error.statusCode = 400;
    error.code = 'INVALID_CURRENT_PASSWORD';
    throw error;
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);
  const [updated] = await db.update(users).set({
    passwordHash,
    mustChangePassword: false,
    tokenVersion: sql`${users.tokenVersion} + 1`,
    updatedAt: new Date(),
  }).where(eq(users.id, userId)).returning();

  return {
    user: { ...toPublicUser(updated), permissions: permissionsFor(updated.role) },
    token: createAccessToken(updated),
    tokenType: 'Bearer',
    expiresIn: env.JWT_EXPIRES_IN,
  };
}

async function logout(userId) {
  await db.update(users)
    .set({ tokenVersion: sql`${users.tokenVersion} + 1`, updatedAt: new Date() })
    .where(eq(users.id, userId));
}

module.exports = { login, getCurrentUser, changePassword, logout };
