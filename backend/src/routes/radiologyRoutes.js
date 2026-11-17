const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const c = require('../controllers/radiologyController');

router.use(protect);
router.get('/', c.getAllOrders);
router.post('/', authorize('super_admin','admin','doctor','receptionist'), c.createOrder);
router.put('/:id', c.updateOrder);
router.patch('/:id/report', authorize('super_admin','admin','radiologist'), c.uploadReport);

module.exports = router;
