const { eq } = require('drizzle-orm');
const { db } = require('../../db/client');
const { systemSettings } = require('../../db/schema');

async function getSettings() {
  const [settings] = await db.select().from(systemSettings).where(eq(systemSettings.id, 1)).limit(1);
  return {
    contactEmailNotificationsEnabled: settings?.contactEmailNotificationsEnabled ?? true,
    updatedBy: settings?.updatedBy ?? null,
    updatedAt: settings?.updatedAt ?? null,
  };
}

async function updateSettings(contactEmailNotificationsEnabled, updatedBy) {
  const [settings] = await db.insert(systemSettings).values({
    id: 1,
    contactEmailNotificationsEnabled,
    updatedBy,
    updatedAt: new Date(),
  }).onConflictDoUpdate({
    target: systemSettings.id,
    set: {
      contactEmailNotificationsEnabled,
      updatedBy,
      updatedAt: new Date(),
    },
  }).returning();

  return {
    contactEmailNotificationsEnabled: settings.contactEmailNotificationsEnabled,
    updatedBy: settings.updatedBy,
    updatedAt: settings.updatedAt,
  };
}

module.exports = { getSettings, updateSettings };
