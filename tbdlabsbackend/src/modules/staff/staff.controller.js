const staffService = require('./staff.service');

async function list(req, res) {
  const staff = await staffService.listStaff();
  res.json({ data: { staff } });
}

async function create(req, res) {
  try {
    const staff = await staffService.createStaff(req.validatedBody);
    return res.status(201).json({ data: { staff } });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: { code: 'EMAIL_ALREADY_EXISTS', message: 'An account already exists with this email.' } });
    }
    throw error;
  }
}

async function updateStatus(req, res) {
  const staff = await staffService.updateStaffStatus(req.validatedParams.id, req.validatedBody.isActive);
  if (!staff) return res.status(404).json({ error: { code: 'STAFF_NOT_FOUND', message: 'Staff account not found.' } });
  return res.json({ data: { staff } });
}

module.exports = { list, create, updateStatus };
