const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const c = require('../controllers/staffController');

router.use(protect);
router.get('/', c.getAllStaff);
router.post('/', authorize('super_admin','admin','hr_staff'), c.createStaff);
router.put('/:id', authorize('super_admin','admin','hr_staff'), c.updateStaff);

module.exports = router;
