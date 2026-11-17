const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const c = require('../controllers/bloodBankController');

router.use(protect);
router.get('/', c.getAllDonors);
router.get('/stock', c.getBloodStock);
router.post('/', authorize('super_admin','admin','nurse','receptionist'), c.registerDonor);
router.put('/:id', authorize('super_admin','admin'), c.updateDonor);

module.exports = router;
