const { z } = require('zod');

const SERVICE_OPTIONS = [
  'Web Development',
  'Mobile Development',
  'AI & Machine Learning',
  'UI/UX Design',
  'Software Development',
  'Digital Solutions',
  'Not sure yet / General inquiry',
];

const optionalText = (max) => z.preprocess(
  (value) => typeof value === 'string' && value.trim() === '' ? undefined : value,
  z.string().trim().max(max).optional(),
);

const contactSchema = z.object({
  name: z.string().trim().min(2).max(150),
  email: z.string().trim().email().max(255).transform((value) => value.toLowerCase()),
  phone: z.string().trim().min(7, 'Phone number must be at least 7 characters.').max(35, 'Phone number cannot exceed 35 characters.'),
  organization: optionalText(150),
  service: z.enum(SERVICE_OPTIONS),
  budget: z.preprocess(
    (value) => typeof value === 'string' && value.trim() === '' ? undefined : value,
    z.enum(['small', 'medium', 'large', 'enterprise']).optional(),
  ),
  message: z.string().trim().min(30).max(10000),
});

module.exports = { contactSchema, SERVICE_OPTIONS };
