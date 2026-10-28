const { Router } = require('express');
const { authGuard, requirePasswordChangeComplete, requireSuperadmin } = require('../../middleware/auth');
const { createStaffSchema, updateStaffStatusSchema } = require('./staff.schemas');
const controller = require('./staff.controller');

const router = Router();
router.use(authGuard, requirePasswordChangeComplete, requireSuperadmin);

router.get('/', controller.list);
router.post('/', (req, res, next) => {
  const parsed = createStaffSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: { code: 'VALIDATION_ERROR', message: 'Staff account details are invalid.' },
      details: parsed.error.issues.map(({ path, message }) => ({ field: path.join('.'), message })),
    });
  }
  req.validatedBody = parsed.data;
  return next();
}, controller.create);

router.patch('/:id/status', (req, res, next) => {
  const parsed = updateStaffStatusSchema.safeParse({ ...req.body, id: req.params.id });
  if (!parsed.success) {
    return res.status(400).json({
      error: { code: 'VALIDATION_ERROR', message: 'A valid staff ID and isActive boolean are required.' },
      details: parsed.error.issues.map(({ path, message }) => ({ field: path.join('.'), message })),
    });
  }
  req.validatedParams = { id: parsed.data.id };
  req.validatedBody = { isActive: parsed.data.isActive };
  return next();
}, controller.updateStatus);

module.exports = router;
