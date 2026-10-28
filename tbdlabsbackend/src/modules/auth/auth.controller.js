const authService = require('./auth.service');

async function login(req, res) {
  const result = await authService.login(req.validatedBody.email, req.validatedBody.password);
  res.json({ data: result });
}

async function me(req, res) {
  const user = await authService.getCurrentUser(req.user.id);
  if (!user) return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'The account is no longer available.' } });
  return res.json({ data: { user } });
}

async function changePassword(req, res) {
  const result = await authService.changePassword(
    req.user.id,
    req.validatedBody.currentPassword,
    req.validatedBody.newPassword,
  );
  return res.json({ data: result });
}

async function logout(req, res) {
  await authService.logout(req.user.id);
  return res.json({ data: { message: 'You have been logged out. All active tokens for this account were revoked.' } });
}

module.exports = { login, me, changePassword, logout };
