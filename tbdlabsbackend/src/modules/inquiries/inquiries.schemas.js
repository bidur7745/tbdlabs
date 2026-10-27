const { z } = require('zod');

const INQUIRY_STATUSES = ['new', 'in_progress', 'replied', 'archived'];

const listInquiriesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(INQUIRY_STATUSES).optional(),
  service: z.string().trim().min(1).max(100).optional(),
  search: z.string().trim().min(1).max(200).optional(),
});

const inquiryIdSchema = z.object({ id: z.string().uuid() });
const claimSchema = z.object({ claimed: z.boolean() });
const replySchema = z.object({
  subject: z.string().trim().min(1).max(200).refine((value) => !/[\r\n]/.test(value), 'Subject must be a single line.').optional(),
  messageBody: z.string().trim().min(2).max(10000),
});
const updateInquiryStatusSchema = z.object({
  status: z.enum(['new', 'archived']),
});

module.exports = {
  INQUIRY_STATUSES,
  listInquiriesQuerySchema,
  inquiryIdSchema,
  claimSchema,
  replySchema,
  updateInquiryStatusSchema,
};
