const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { rateLimit } = require('express-rate-limit');
const { apiReference } = require('@scalar/express-api-reference');
const { env } = require('./config/env');
const { openapiDocument } = require('./config/openapi');
const { pool } = require('./db/client');
const { notFoundHandler, errorHandler } = require('./middleware/error-handler');
const authRoutes = require('./modules/auth/auth.routes');
const staffRoutes = require('./modules/staff/staff.routes');
const settingsRoutes = require('./modules/settings/settings.routes');
const contactRoutes = require('./modules/contact/contact.routes');

const app = express();
if (env.TRUST_PROXY) app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: env.FRONTEND_URL, methods: ['GET', 'POST', 'PATCH', 'OPTIONS'] }));
app.use(express.json({ limit: '32kb' }));
app.use(rateLimit({ windowMs: env.RATE_LIMIT_WINDOW_MS, limit: env.RATE_LIMIT_MAX_REQUESTS, standardHeaders: 'draft-7', legacyHeaders: false }));

app.get('/api-docs/openapi.json', (req, res) => res.json(openapiDocument));
app.use('/reference', (req, res, next) => {
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "base-uri 'self'",
    "font-src 'self' https: data:",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "img-src 'self' data:",
    "object-src 'none'",
    "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
    "script-src-attr 'none'",
    "style-src 'self' https: 'unsafe-inline'",
    'upgrade-insecure-requests',
  ].join('; '));
  next();
});
app.use('/reference', apiReference({ url: '/api-docs/openapi.json', theme: 'moon' }));

app.get(`${env.API_PREFIX}/health`, async (req, res, next) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    next(Object.assign(new Error('Database health check failed.'), { statusCode: 503, cause: error }));
  }
});

app.use(`${env.API_PREFIX}/auth`, authRoutes);
app.use(`${env.API_PREFIX}/admin/staff`, staffRoutes);
app.use(`${env.API_PREFIX}/admin/settings`, settingsRoutes);
app.use(`${env.API_PREFIX}/contact`, contactRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = { app };
