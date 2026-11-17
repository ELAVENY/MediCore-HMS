const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const c = require('../controllers/userController');

router.use(protect);
router.get('/', authorize('super_admin', 'admin'), c.getAllUsers);
router.get('/:id', authorize('super_admin', 'admin'), c.getUserById);
router.put('/:id', authorize('super_admin', 'admin'), c.updateUser);
router.patch('/:id/toggle-status', authorize('super_admin', 'admin'), c.toggleUserStatus);
router.patch('/change-password', c.changePassword);

module.exports = router;
