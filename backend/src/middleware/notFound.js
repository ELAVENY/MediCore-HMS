const { errorResponse } = require('../utils/apiResponse');

const notFound = (req, res, next) => {
  return errorResponse(res, 404, `Route not found: ${req.originalUrl}`);
};

module.exports = notFound;
