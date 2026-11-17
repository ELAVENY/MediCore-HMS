const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const c = require('../controllers/reportsController');

router.use(protect);
router.use(authorize('super_admin', 'admin', 'accountant', 'doctor'));
router.get('/monthly-trend', c.getMonthlyTrend);
router.get('/department-stats', c.getDepartmentStats);
router.get('/summary', c.getSummaryReport);

module.exports = router;
