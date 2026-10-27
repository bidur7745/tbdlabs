const { env } = require('./env');

const openapiDocument = {
  openapi: '3.1.0',
  info: {
    title: 'TBD Labs API',
    version: '1.0.0',
    description: 'API for TBD Labs website inquiries and administration.',
  },
  servers: [{ url: env.API_PREFIX }],
  tags: [{ name: 'Health', description: 'Service and dependency health' }],
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Check API and database health',
        responses: {
          200: { description: 'API and database are healthy' },
          503: { description: 'A required dependency is unavailable' },
        },
      },
    },
  },
};

module.exports = { openapiDocument };
