const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const c = require('../controllers/medicalRecordController');

router.use(protect);
router.get('/', c.getAllRecords);
router.get('/:id', c.getRecordById);
router.post('/', authorize('super_admin','admin','doctor','nurse'), c.createRecord);
router.put('/:id', authorize('super_admin','admin','doctor'), c.updateRecord);

module.exports = router;
