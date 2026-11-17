const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const c = require('../controllers/prescriptionController');

router.use(protect);
router.get('/', c.getAllPrescriptions);
router.get('/:id', c.getPrescriptionById);
router.post('/', authorize('super_admin','admin','doctor'), c.createPrescription);
router.patch('/:id/dispense', authorize('super_admin','admin','pharmacist'), c.dispensePrescription);

module.exports = router;
