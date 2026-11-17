const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/apiResponse');

// POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.validatedData;
  const { user, accessToken, refreshToken } = await authService.loginUser(email, password);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return successResponse(res, 200, 'Login successful', { user, accessToken });
};

// POST /api/auth/register  (admin only)
const register = async (req, res) => {
  const user = await authService.registerUser(req.validatedData);
  return successResponse(res, 201, 'User registered successfully', { user });
};

// POST /api/auth/refresh
const refresh = async (req, res) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;
  const { accessToken } = await authService.refreshAccessToken(token);
  return successResponse(res, 200, 'Token refreshed', { accessToken });
};

// POST /api/auth/logout
const logout = async (req, res) => {
  await authService.logoutUser(req.user._id);
  res.clearCookie('refreshToken');
  return successResponse(res, 200, 'Logged out successfully');
};

// GET /api/auth/me
const getMe = async (req, res) => {
  return successResponse(res, 200, 'User profile', { user: req.user });
};

// POST /api/auth/forgot-password
const forgotPassword = async (req, res) => {
  const { email } = req.validatedData;
  const resetToken = await authService.forgotPassword(email);
  // In production: send reset link via email
  // For dev: return token in response
  const data = process.env.NODE_ENV === 'development' ? { resetToken } : {};
  return successResponse(res, 200, 'Password reset instructions sent (check server logs in dev)', data);
};

// POST /api/auth/reset-password
const resetPassword = async (req, res) => {
  const { token, password } = req.validatedData;
  await authService.resetPassword(token, password);
  return successResponse(res, 200, 'Password reset successful. Please log in.');
};

module.exports = { login, register, refresh, logout, getMe, forgotPassword, resetPassword };
