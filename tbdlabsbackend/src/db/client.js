const { Pool } = require('pg');
const { drizzle } = require('drizzle-orm/node-postgres');
const { env } = require('../config/env');
const schema = require('./schema');

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('error', (error) => console.error('Unexpected idle PostgreSQL client error:', error));

const db = drizzle(pool, { schema });
module.exports = { db, pool };
