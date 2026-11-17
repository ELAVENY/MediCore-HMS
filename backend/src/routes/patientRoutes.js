const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const c = require('../controllers/patientController');

router.use(protect);
router.get('/', c.getAllPatients);
router.get('/:id', c.getPatientById);
router.post('/', authorize('super_admin','admin','receptionist','doctor','nurse'), c.createPatient);
router.put('/:id', authorize('super_admin','admin','receptionist','doctor','nurse'), c.updatePatient);
router.delete('/:id', authorize('super_admin','admin'), c.deletePatient);

module.exports = router;
