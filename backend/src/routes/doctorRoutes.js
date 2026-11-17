const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const c = require('../controllers/doctorController');

router.use(protect);
router.get('/', c.getAllDoctors);
router.get('/:id', c.getDoctorById);
router.post('/', authorize('super_admin','admin'), c.createDoctor);
router.put('/:id', authorize('super_admin','admin'), c.updateDoctor);
router.delete('/:id', authorize('super_admin','admin'), c.deleteDoctor);

module.exports = router;
