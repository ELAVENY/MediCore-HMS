const User = require('../models/User');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/apiResponse');

const getAllUsers = async (req, res) => {
  const { page = 1, limit = 20, role, search = '' } = req.query;
  const query = {};
  if (role) query.role = role;
  if (search) query.$or = [
    { name: { $regex: search, $options: 'i' } },
    { email: { $regex: search, $options: 'i' } },
  ];

  const total = await User.countDocuments(query);
  const users = await User.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return paginatedResponse(res, 'Users retrieved', users, {
    total, page: Number(page), limit: Number(limit),
    totalPages: Math.ceil(total / limit),
  });
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return errorResponse(res, 404, 'User not found');
  return successResponse(res, 200, 'User retrieved', { user });
};

const updateUser = async (req, res) => {
  const { password, ...safeData } = req.body; // prevent direct password updates here
  const user = await User.findByIdAndUpdate(req.params.id, safeData, { new: true, runValidators: true });
  if (!user) return errorResponse(res, 404, 'User not found');
  return successResponse(res, 200, 'User updated', { user });
};

const toggleUserStatus = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return errorResponse(res, 404, 'User not found');
  if (user._id.toString() === req.user._id.toString()) {
    return errorResponse(res, 400, 'Cannot deactivate your own account');
  }
  user.isActive = !user.isActive;
  await user.save({ validateBeforeSave: false });
  return successResponse(res, 200, `User ${user.isActive ? 'activated' : 'deactivated'}`, { user });
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id).select('+password');
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) return errorResponse(res, 400, 'Current password is incorrect');
  user.password = newPassword;
  await user.save();
  return successResponse(res, 200, 'Password changed successfully');
};

module.exports = { getAllUsers, getUserById, updateUser, toggleUserStatus, changePassword };
