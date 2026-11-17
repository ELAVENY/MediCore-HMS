const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const c = require('../controllers/ambulanceController');

router.use(protect);
router.get('/', c.getAllAmbulances);
router.post('/', authorize('super_admin','admin'), c.createAmbulance);
router.put('/:id', authorize('super_admin','admin'), c.updateAmbulance);
router.patch('/:id/dispatch', authorize('super_admin','admin','receptionist'), c.dispatchAmbulance);

module.exports = router;
