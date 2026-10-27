const settingsService = require('./settings.service');

async function get(req, res) {
  const settings = await settingsService.getSettings();
  res.json({ data: { settings } });
}

async function update(req, res) {
  const settings = await settingsService.updateSettings(
    req.validatedBody.contactEmailNotificationsEnabled,
    req.user.id,
  );
  res.json({ data: { settings } });
}

module.exports = { get, update };
