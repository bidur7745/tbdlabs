const { Router } = require('express');
const { rateLimit } = require('express-rate-limit');
const { env } = require('../../config/env');
const { contactSchema } = require('./contact.schemas');
const controller = require('./contact.controller');

const router = Router();
const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: env.CONTACT_RATE_LIMIT_MAX,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: { code: 'RATE_LIMITED', message: 'Too many inquiries. Please try again later.' } },
});

router.post('/', contactRateLimit, (req, res, next) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: { code: 'VALIDATION_ERROR', message: 'Please correct the highlighted inquiry fields.' },
      details: parsed.error.issues.map(({ path, message }) => ({ field: path.join('.'), message })),
    });
  }
  req.validatedBody = parsed.data;
  return next();
}, controller.submit);

module.exports = router;
