require('dotenv').config();
const bcrypt = require('bcryptjs');
const { z } = require('zod');
const { eq } = require('drizzle-orm');
const { db, pool } = require('../src/db/client');
const { users } = require('../src/db/schema');

const seedSchema = z.object({
  SUPERADMIN_NAME: z.string().trim().min(2).max(120),
  SUPERADMIN_EMAIL: z.string().trim().email().max(255).transform((value) => value.toLowerCase()),
  SUPERADMIN_PASSWORD: z.string().min(12).max(72)
    .refine((value) => Buffer.byteLength(value, 'utf8') <= 72, 'Password must be at most 72 bytes.')
    .refine((value) => value !== 'ChangeThisPassword123!', 'Replace the example password before seeding.'),
});

async function seedSuperadmin() {
  const parsed = seedSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error('Invalid superadmin seed configuration:', parsed.error.flatten().fieldErrors);
    process.exitCode = 1;
    return;
  }

  const { SUPERADMIN_NAME: name, SUPERADMIN_EMAIL: email, SUPERADMIN_PASSWORD: password } = parsed.data;
  const [existing] = await db.select({ id: users.id, role: users.role })
    .from(users).where(eq(users.email, email)).limit(1);

  if (existing) {
    if (existing.role === 'superadmin') {
      console.log('A superadmin with this email already exists; no changes were made.');
      return;
    }
    console.error('The configured superadmin email is already assigned to a non-superadmin account. No changes were made.');
    process.exitCode = 1;
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await db.insert(users).values({
    name,
    email,
    passwordHash,
    role: 'superadmin',
    isActive: true,
  });

  console.log(`Superadmin account created for ${email}.`);
}

seedSuperadmin()
  .catch((error) => {
    if (error.code === '23505') {
      console.error('An account with the configured superadmin email already exists; no changes were made.');
    } else {
      console.error('Superadmin seed failed:', error.code || 'Unexpected database error.');
    }
    process.exitCode = 1;
  })
  .finally(() => pool.end());
