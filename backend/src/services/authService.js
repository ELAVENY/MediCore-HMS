const crypto = require('crypto');
const User = require('../models/User');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt');

// Login
const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password +refreshToken');
  if (!user) throw { statusCode: 401, message: 'Invalid email or password.' };
  if (!user.isActive) throw { statusCode: 403, message: 'Account is deactivated. Contact admin.' };

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw { statusCode: 401, message: 'Invalid email or password.' };

  const tokenPayload = { id: user._id, role: user.role };
  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  user.refreshToken = refreshToken;
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  return { user, accessToken, refreshToken };
};

// Register (admin only creates users)
const registerUser = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw { statusCode: 409, message: 'Email already registered.' };

  const user = await User.create(data);
  return user;
};

// Refresh token
const refreshAccessToken = async (token) => {
  if (!token) throw { statusCode: 401, message: 'Refresh token required.' };

  let decoded;
  try {
    decoded = verifyRefreshToken(token);
  } catch {
    throw { statusCode: 401, message: 'Invalid or expired refresh token.' };
  }

  const user = await User.findById(decoded.id).select('+refreshToken');
  if (!user || user.refreshToken !== token) {
    throw { statusCode: 401, message: 'Refresh token mismatch.' };
  }

  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  return { accessToken };
};

// Logout
const logoutUser = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
};

// Forgot password — returns a reset token (in real app, email this)
const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw { statusCode: 404, message: 'No account with that email.' };

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.passwordResetExpires = Date.now() + 15 * 60 * 1000; // 15 min
  await user.save({ validateBeforeSave: false });

  return resetToken; // In production: send via email
};

// Reset password
const resetPassword = async (rawToken, newPassword) => {
  const hashed = crypto.createHash('sha256').update(rawToken).digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashed,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw { statusCode: 400, message: 'Token is invalid or has expired.' };

  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
};

module.exports = { loginUser, registerUser, refreshAccessToken, logoutUser, forgotPassword, resetPassword };
