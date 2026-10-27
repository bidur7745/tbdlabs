const { Router } = require('express');
const { authGuard, requireSuperadmin } = require('../../middleware/auth');
const { updateSettingsSchema } = require('./settings.schemas');
const controller = require('./settings.controller');

const router = Router();
router.use(authGuard, requireSuperadmin);
router.get('/', controller.get);
router.patch('/', (req, res, next) => {
  const parsed = updateSettingsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: { code: 'VALIDATION_ERROR', message: 'contactEmailNotificationsEnabled must be a boolean.' },
    });
  }
  req.validatedBody = parsed.data;
  return next();
}, controller.update);

module.exports = router;
