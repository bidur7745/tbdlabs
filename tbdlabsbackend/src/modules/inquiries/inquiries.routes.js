const { Router } = require('express');
const { authGuard, requirePasswordChangeComplete, requireStaff } = require('../../middleware/auth');
const {
  listInquiriesQuerySchema,
  inquiryIdSchema,
  claimSchema,
  replySchema,
  updateInquiryStatusSchema,
} = require('./inquiries.schemas');
const controller = require('./inquiries.controller');

const router = Router();
router.use(authGuard, requirePasswordChangeComplete);

router.get('/', (req, res, next) => {
  const parsed = listInquiriesQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({
      error: { code: 'VALIDATION_ERROR', message: 'Invalid inquiry filters or pagination values.' },
      details: parsed.error.issues.map(({ path, message }) => ({ field: path.join('.'), message })),
    });
  }
  req.validatedQuery = parsed.data;
  return next();
}, controller.list);

router.get('/:id', (req, res, next) => {
  const parsed = inquiryIdSchema.safeParse(req.params);
  if (!parsed.success) return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'A valid inquiry UUID is required.' } });
  req.validatedParams = parsed.data;
  return next();
}, controller.get);

router.post('/:id/claim', requireStaff, (req, res, next) => {
  const params = inquiryIdSchema.safeParse(req.params);
  const body = claimSchema.safeParse(req.body);
  if (!params.success || !body.success) {
    return res.status(400).json({
      error: { code: 'VALIDATION_ERROR', message: 'A valid inquiry UUID and claimed boolean are required.' },
    });
  }
  req.validatedParams = params.data;
  req.validatedBody = body.data;
  return next();
}, controller.claim);

router.post('/:id/reply', requireStaff, (req, res, next) => {
  const params = inquiryIdSchema.safeParse(req.params);
  const body = replySchema.safeParse(req.body);
  if (!params.success || !body.success) {
    return res.status(400).json({
      error: { code: 'VALIDATION_ERROR', message: 'Provide a valid inquiry UUID and a reply message.' },
      ...(body.success ? {} : { details: body.error.issues.map(({ path, message }) => ({ field: path.join('.'), message })) }),
    });
  }
  req.validatedParams = params.data;
  req.validatedBody = body.data;
  return next();
}, controller.reply);

router.patch('/:id/status', requireStaff, (req, res, next) => {
  const params = inquiryIdSchema.safeParse(req.params);
  const body = updateInquiryStatusSchema.safeParse(req.body);
  if (!params.success || !body.success) {
    return res.status(400).json({
      error: { code: 'VALIDATION_ERROR', message: 'Status must be either "new" or "archived".' },
    });
  }
  req.validatedParams = params.data;
  req.validatedBody = body.data;
  return next();
}, controller.updateStatus);

module.exports = router;
