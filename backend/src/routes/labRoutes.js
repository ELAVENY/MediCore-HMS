const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const c = require('../controllers/labController');

router.use(protect);
router.get('/', c.getAllLabOrders);
router.post('/', authorize('super_admin','admin','doctor','receptionist'), c.createLabOrder);
router.put('/:id', c.updateLabOrder);
router.patch('/:id/results', authorize('super_admin','admin','lab_technician'), c.enterResults);
router.patch('/:id/verify', authorize('super_admin','admin','lab_technician'), c.verifyResult);

module.exports = router;
