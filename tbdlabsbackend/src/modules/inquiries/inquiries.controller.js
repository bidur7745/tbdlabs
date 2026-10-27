const inquiryService = require('./inquiries.service');

function respondOutcome(res, outcome) {
  if (outcome.error) {
    return res.status(outcome.statusCode).json({
      error: outcome.error,
      ...(outcome.data ? { data: outcome.data } : {}),
    });
  }
  return res.status(outcome.statusCode || 200).json({ data: outcome.data || outcome });
}

async function list(req, res) {
  const result = await inquiryService.listInquiries(req.validatedQuery);
  res.json({ data: result });
}

async function get(req, res) {
  const inquiry = await inquiryService.getInquiry(req.validatedParams.id);
  if (!inquiry) return res.status(404).json({ error: { code: 'INQUIRY_NOT_FOUND', message: 'Inquiry not found.' } });
  return res.json({ data: { inquiry } });
}

async function claim(req, res) {
  const result = await inquiryService.claimInquiry(req.validatedParams.id, {
    ...req.user,
    claimed: req.validatedBody.claimed,
  });
  return respondOutcome(res, result);
}

async function reply(req, res) {
  try {
    const result = await inquiryService.replyToInquiry(req.validatedParams.id, {
      ...req.user,
      ...req.validatedBody,
    });
    return respondOutcome(res, result);
  } catch (error) {
    if (error.code === 'REPLY_EMAIL_FAILED') {
      return res.status(503).json({
        error: { code: 'REPLY_DELIVERY_FAILED', message: 'The reply could not be delivered. No reply was recorded; try again later.' },
      });
    }
    throw error;
  }
}

async function updateStatus(req, res) {
  const result = await inquiryService.updateInquiryStatus(req.validatedParams.id, req.validatedBody.status);
  return respondOutcome(res, result);
}

module.exports = { list, get, claim, reply, updateStatus };
