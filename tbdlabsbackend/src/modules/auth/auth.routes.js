const { Router } = require('express');
const { rateLimit } = require('express-rate-limit');
const { authGuard } = require('../../middleware/auth');
const { loginSchema, changePasswordSchema } = require('./auth.schemas');
const controller = require('./auth.controller');

const router = Router();
const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: { code: 'RATE_LIMITED', message: 'Too many login attempts. Try again later.' } },
});

router.post('/login', loginRateLimit, (req, res, next) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: { code: 'VALIDATION_ERROR', message: 'Please provide a valid email and password.' },
      details: parsed.error.issues.map(({ path, message }) => ({ field: path.join('.'), message })),
    });
  }
  req.validatedBody = parsed.data;
  return next();
}, controller.login);

router.get('/me', authGuard, controller.me);
router.post('/change-password', authGuard, (req, res, next) => {
  const parsed = changePasswordSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: { code: 'VALIDATION_ERROR', message: 'Use a new password with at least 12 characters, different from the current password.' },
      details: parsed.error.issues.map(({ path, message }) => ({ field: path.join('.'), message })),
    });
  }
  req.validatedBody = parsed.data;
  return next();
}, controller.changePassword);
router.post('/logout', authGuard, controller.logout);

module.exports = router;
