const { z } = require('zod');

const updateSettingsSchema = z.object({
  contactEmailNotificationsEnabled: z.boolean(),
});

module.exports = { updateSettingsSchema };
