const { env } = require('./env');

const openapiDocument = {
  openapi: '3.1.0',
  info: {
    title: 'TBD Labs API',
    version: '1.0.0',
    description: 'API for TBD Labs website inquiries and administration.',
  },
  servers: [{ url: env.API_PREFIX }],
  tags: [
    { name: 'Health', description: 'Service and dependency health' },
    { name: 'Authentication', description: 'Staff and superadmin login sessions' },
    { name: 'Staff', description: 'Superadmin staff account management' },
    { name: 'Settings', description: 'Superadmin system settings' },
    { name: 'Contact', description: 'Public project inquiry submission' },
  ],
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
    '/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'Authenticate a staff or superadmin account',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } } },
        },
        responses: {
          200: { description: 'Bearer token and account profile' },
          400: { description: 'Invalid request body' },
          401: { description: 'Invalid credentials or inactive account' },
          429: { description: 'Too many login attempts' },
        },
      },
    },
    '/auth/me': {
      get: {
        tags: ['Authentication'],
        summary: 'Get the current account and permissions',
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: 'Current account profile and permissions' },
          401: { description: 'Missing, invalid, expired, or revoked token' },
        },
      },
    },
    '/auth/logout': {
      post: {
        tags: ['Authentication'],
        summary: 'Revoke all active tokens for the current account',
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: 'Account tokens revoked' },
          401: { description: 'Missing, invalid, expired, or revoked token' },
        },
      },
    },
    '/admin/staff': {
      get: {
        tags: ['Staff'],
        summary: 'List staff accounts',
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: 'Staff accounts without password hashes' },
          401: { description: 'Authentication required' },
          403: { description: 'Superadmin access required' },
        },
      },
      post: {
        tags: ['Staff'],
        summary: 'Create a staff account',
        description: 'A superadmin supplies the initial password. A welcome email is sent when SMTP is configured.',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateStaffRequest' } } },
        },
        responses: {
          201: { description: 'Staff account created; password is never returned' },
          400: { description: 'Invalid account details' },
          401: { description: 'Authentication required' },
          403: { description: 'Superadmin access required' },
          409: { description: 'Email address already exists' },
        },
      },
    },
    '/admin/staff/{id}/status': {
      patch: {
        tags: ['Staff'],
        summary: 'Activate or deactivate a staff account',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/StaffStatusRequest' } } },
        },
        responses: {
          200: { description: 'Staff account status updated' },
          400: { description: 'Invalid staff ID or status' },
          401: { description: 'Authentication required' },
          403: { description: 'Superadmin access required' },
          404: { description: 'Staff account not found' },
        },
      },
    },
    '/admin/settings': {
      get: {
        tags: ['Settings'],
        summary: 'Get system email notification settings',
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: 'Current notification settings' },
          401: { description: 'Authentication required' },
          403: { description: 'Superadmin access required' },
        },
      },
      patch: {
        tags: ['Settings'],
        summary: 'Enable or disable staff inquiry alert emails',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/UpdateSettingsRequest' } } },
        },
        responses: {
          200: { description: 'Settings updated' },
          400: { description: 'Invalid settings payload' },
          401: { description: 'Authentication required' },
          403: { description: 'Superadmin access required' },
        },
      },
    },
    '/contact': {
      post: {
        tags: ['Contact'],
        summary: 'Submit a project inquiry',
        description: 'The inquiry is saved before email delivery is attempted. Staff alert email is sent only when enabled in system settings.',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ContactRequest' } } },
        },
        responses: {
          201: { description: 'Inquiry saved' },
          400: { description: 'Invalid inquiry fields' },
          429: { description: 'Inquiry rate limit exceeded' },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      BearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
    schemas: {
      LoginRequest: {
        type: 'object', required: ['email', 'password'],
        properties: { email: { type: 'string', format: 'email' }, password: { type: 'string', format: 'password' } },
      },
      CreateStaffRequest: {
        type: 'object', required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string', minLength: 2, maxLength: 120 },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', format: 'password', minLength: 12, maxLength: 72 },
        },
      },
      StaffStatusRequest: {
        type: 'object', required: ['isActive'],
        properties: { isActive: { type: 'boolean' } },
      },
      UpdateSettingsRequest: {
        type: 'object', required: ['contactEmailNotificationsEnabled'],
        properties: { contactEmailNotificationsEnabled: { type: 'boolean' } },
      },
      ContactRequest: {
        type: 'object', required: ['name', 'email', 'service', 'message'],
        properties: {
          name: { type: 'string', minLength: 2, maxLength: 150 },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string', maxLength: 35 },
          organization: { type: 'string', maxLength: 150 },
          service: { type: 'string', enum: ['Web Development', 'Mobile Development', 'AI & Machine Learning', 'UI/UX Design', 'Software Development', 'Digital Solutions', 'Not sure yet / General inquiry'] },
          budget: { type: 'string', enum: ['small', 'medium', 'large', 'enterprise'] },
          message: { type: 'string', minLength: 30, maxLength: 10000 },
        },
      },
    },
  },
};

module.exports = { openapiDocument };
