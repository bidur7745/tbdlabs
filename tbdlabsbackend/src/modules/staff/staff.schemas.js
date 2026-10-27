const { z } = require('zod');

const createStaffSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255).transform((value) => value.toLowerCase()),
  password: z.string().min(12).max(72).refine((value) => Buffer.byteLength(value, 'utf8') <= 72, 'Password must be at most 72 bytes.'),
});

const updateStaffStatusSchema = z.object({
  id: z.string().uuid(),
  isActive: z.boolean(),
});

module.exports = { createStaffSchema, updateStaffStatusSchema };
