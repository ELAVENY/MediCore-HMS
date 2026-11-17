const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const c = require('../controllers/admissionController');

router.use(protect);
router.get('/', c.getAllAdmissions);
router.post('/', authorize('super_admin','admin','receptionist','doctor'), c.createAdmission);
router.patch('/:id/discharge', authorize('super_admin','admin','doctor'), c.dischargePatient);

module.exports = router;
