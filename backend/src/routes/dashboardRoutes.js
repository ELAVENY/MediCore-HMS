const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { getDashboardStats } = require('../controllers/dashboardController');

router.get('/stats', protect, authorize('super_admin','admin','doctor','nurse','receptionist'), getDashboardStats);

module.exports = router;
