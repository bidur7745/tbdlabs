require('dotenv').config();
const { app } = require('./app');
const { env } = require('./config/env');
const { pool } = require('./db/client');

const server = app.listen(env.PORT, () => {
  const baseUrl = `http://localhost:${env.PORT}`;

  console.log(`TBD Labs API (${env.NODE_ENV}) is running at ${baseUrl}`);
  console.log(`Scalar API reference: ${baseUrl}/reference`);
  console.log(`Health endpoint: ${baseUrl}${env.API_PREFIX}/health`);

  pool.query('SELECT 1')
    .then(() => console.log('Database connection successful.'))
    .catch((error) => {
      const code = error.code ? ` [${error.code}]` : '';
      console.error(`Database connection failed${code}. Check DATABASE_URL and database availability.`);
    });
});

async function shutdown(signal) {
  console.log(`${signal} received; shutting down.`);
  server.close(async (error) => {
    try {
      await pool.end();
      process.exit(error ? 1 : 0);
    } catch (shutdownError) {
      console.error('Error while closing database pool:', shutdownError);
      process.exit(1);
    }
  });
  setTimeout(() => process.exit(1), 10000).unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
