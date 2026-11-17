const { verifyAccessToken } = require('../utils/jwt');
const User = require('../models/User');
const { errorResponse } = require('../utils/apiResponse');

// Verify JWT and attach user to req
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 401, 'Access denied. No token provided.');
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);

    const user = await User.findById(decoded.id).select('-password -refreshToken');
    if (!user) return errorResponse(res, 401, 'User not found.');
    if (!user.isActive) return errorResponse(res, 403, 'Account is deactivated.');

    req.user = user;
    next();
  } catch (err) {
    return errorResponse(res, 401, 'Invalid or expired token.');
  }
};

// Role-based access control
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return errorResponse(res, 403, `Role '${req.user.role}' is not authorized for this action.`);
    }
    next();
  };
};

module.exports = { protect, authorize };
