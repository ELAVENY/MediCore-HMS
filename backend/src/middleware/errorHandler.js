const { errorResponse } = require('../utils/apiResponse');

// Handle Mongoose CastError (invalid ObjectId)
const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return { statusCode: 400, message };
};

// Handle Mongoose duplicate key error
const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const message = `Duplicate value for field: ${field}. Please use a different value.`;
  return { statusCode: 409, message };
};

// Handle Mongoose validation errors
const handleValidationError = (err) => {
  const messages = Object.values(err.errors).map((e) => e.message);
  return { statusCode: 400, message: messages.join('. ') };
};

// Handle JWT errors
const handleJWTError = () => ({
  statusCode: 401,
  message: 'Invalid token. Please log in again.',
});

const handleJWTExpiredError = () => ({
  statusCode: 401,
  message: 'Your token has expired. Please log in again.',
});

// Global error handling middleware
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'CastError') ({ statusCode, message } = handleCastError(err));
  if (err.code === 11000) ({ statusCode, message } = handleDuplicateKeyError(err));
  if (err.name === 'ValidationError') ({ statusCode, message } = handleValidationError(err));
  if (err.name === 'JsonWebTokenError') ({ statusCode, message } = handleJWTError());
  if (err.name === 'TokenExpiredError') ({ statusCode, message } = handleJWTExpiredError());

  if (process.env.NODE_ENV === 'development') {
    console.error('ERROR:', err);
  }

  return errorResponse(res, statusCode, message);
};

module.exports = errorHandler;
