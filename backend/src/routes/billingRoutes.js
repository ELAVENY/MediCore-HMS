const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const c = require('../controllers/billingController');

router.use(protect);
router.get('/', c.getAllInvoices);
router.get('/summary/revenue', authorize('super_admin','admin','accountant'), c.getRevenueSummary);
router.get('/:id', c.getInvoiceById);
router.post('/', authorize('super_admin','admin','accountant','receptionist'), c.createInvoice);
router.patch('/:id/payment', authorize('super_admin','admin','accountant','receptionist'), c.recordPayment);

module.exports = router;
