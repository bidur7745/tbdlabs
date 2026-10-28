const jwt = require('jsonwebtoken');
const { eq } = require('drizzle-orm');
const { db } = require('../db/client');
const { users } = require('../db/schema');
const { env } = require('../config/env');

const JWT_OPTIONS = {
  algorithms: ['HS256'],
  issuer: 'tbd-labs-api',
  audience: 'tbd-labs-admin',
};

async function authGuard(req, res, next) {
  const authorization = req.get('authorization');
  const match = authorization?.match(/^Bearer\s+([^\s]+)$/i);
  if (!match) {
    return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'A valid bearer token is required.' } });
  }

  try {
    const payload = jwt.verify(match[1], env.JWT_SECRET, JWT_OPTIONS);
    if (typeof payload.sub !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(payload.sub)
      || !Number.isInteger(payload.ver)) {
      return res.status(401).json({ error: { code: 'INVALID_TOKEN', message: 'The bearer token is invalid or expired.' } });
    }

    const [user] = await db.select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      isActive: users.isActive,
      tokenVersion: users.tokenVersion,
      mustChangePassword: users.mustChangePassword,
    }).from(users).where(eq(users.id, payload.sub)).limit(1);

    if (!user || !user.isActive || user.tokenVersion !== payload.ver) {
      return res.status(401).json({ error: { code: 'INVALID_TOKEN', message: 'The bearer token is invalid or expired.' } });
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      mustChangePassword: user.mustChangePassword,
    };
    req.token = match[1];
    return next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError' || error.name === 'NotBeforeError') {
      return res.status(401).json({ error: { code: 'INVALID_TOKEN', message: 'The bearer token is invalid or expired.' } });
    }
    return next(error);
  }
}

function requireSuperadmin(req, res, next) {
  if (req.user?.role !== 'superadmin') {
    return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Superadmin access is required.' } });
  }
  return next();
}

function requireStaff(req, res, next) {
  if (req.user?.role !== 'staff') {
    return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Staff access is required for this action.' } });
  }
  return next();
}

function requirePasswordChangeComplete(req, res, next) {
  if (req.user?.mustChangePassword) {
    return res.status(403).json({
      error: { code: 'PASSWORD_CHANGE_REQUIRED', message: 'Change your temporary password before accessing this resource.' },
    });
  }
  return next();
}

module.exports = { authGuard, requireSuperadmin, requireStaff, requirePasswordChangeComplete, JWT_OPTIONS };
