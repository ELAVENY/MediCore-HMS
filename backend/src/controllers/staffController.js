const Staff = require('../models/Staff');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/apiResponse');

const getAllStaff = async (req, res) => {
  const { page = 1, limit = 20, search = '', role, department } = req.query;
  const query = {};
  if (search) query.$or = [
    { name: { $regex: search, $options: 'i' } },
    { staffId: { $regex: search, $options: 'i' } },
  ];
  if (role) query.role = role;
  if (department) query.department = department;

  const total = await Staff.countDocuments(query);
  const staff = await Staff.find(query)
    .sort({ name: 1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return paginatedResponse(res, 'Staff retrieved', staff, {
    total, page: Number(page), limit: Number(limit),
    totalPages: Math.ceil(total / limit),
  });
};

const createStaff = async (req, res) => {
  const staff = await Staff.create(req.body);
  return successResponse(res, 201, 'Staff added', { staff });
};

const updateStaff = async (req, res) => {
  const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!staff) return errorResponse(res, 404, 'Staff not found');
  return successResponse(res, 200, 'Staff updated', { staff });
};

module.exports = { getAllStaff, createStaff, updateStaff };
