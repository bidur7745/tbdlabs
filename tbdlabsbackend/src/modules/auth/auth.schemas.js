const { z } = require('zod');

const loginSchema = z.object({
  email: z.string().trim().email().max(255).transform((value) => value.toLowerCase()),
  password: z.string().min(1).max(72),
});

module.exports = { loginSchema };
