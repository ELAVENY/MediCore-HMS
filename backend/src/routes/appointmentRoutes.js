const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const c = require('../controllers/appointmentController');

router.use(protect);
router.get('/', c.getAllAppointments);
router.post('/', authorize('super_admin','admin','receptionist','doctor'), c.createAppointment);
router.put('/:id', authorize('super_admin','admin','receptionist','doctor'), c.updateAppointment);
router.patch('/:id/cancel', authorize('super_admin','admin','receptionist','doctor'), c.cancelAppointment);

module.exports = router;
