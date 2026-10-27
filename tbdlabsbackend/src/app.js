const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { rateLimit } = require('express-rate-limit');
const { apiReference } = require('@scalar/express-api-reference');
const { env } = require('./config/env');
const { openapiDocument } = require('./config/openapi');
const { pool } = require('./db/client');
const { notFoundHandler, errorHandler } = require('./middleware/error-handler');

const app = express();
if (env.TRUST_PROXY) app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: env.FRONTEND_URL, methods: ['GET', 'POST', 'PATCH', 'OPTIONS'] }));
app.use(express.json({ limit: '32kb' }));
app.use(rateLimit({ windowMs: env.RATE_LIMIT_WINDOW_MS, limit: env.RATE_LIMIT_MAX_REQUESTS, standardHeaders: 'draft-7', legacyHeaders: false }));

app.get('/api-docs/openapi.json', (req, res) => res.json(openapiDocument));
app.use('/reference', apiReference({ url: '/api-docs/openapi.json', theme: 'moon' }));

app.get(`${env.API_PREFIX}/health`, async (req, res, next) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    next(Object.assign(new Error('Database health check failed.'), { statusCode: 503, cause: error }));
  }
});

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = { app };
