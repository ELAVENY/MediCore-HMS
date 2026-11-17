const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { successResponse } = require('../utils/apiResponse');

// GET /api/health
router.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  return successResponse(res, 200, 'MediCore HMS API is running', {
    status: 'ok',
    database: dbStatus,
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

module.exports = router;
