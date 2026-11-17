const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const c = require('../controllers/pharmacyController');

router.use(protect);
router.get('/', c.getAllMedicines);
router.get('/alerts/low-stock', c.getLowStockAlerts);
router.get('/:id', c.getMedicineById);
router.post('/', authorize('super_admin','admin','pharmacist'), c.createMedicine);
router.put('/:id', authorize('super_admin','admin','pharmacist'), c.updateMedicine);
router.patch('/:id/dispense', authorize('super_admin','admin','pharmacist'), c.dispenseMedicine);

module.exports = router;
