const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');
const { validate, loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema } = require('../validators/authValidator');

// Public routes
router.post('/login', validate(loginSchema), authController.login);
router.post('/refresh', authController.refresh);
router.post('/forgot-password', validate(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword);

// Protected routes
router.get('/me', protect, authController.getMe);
router.post('/logout', protect, authController.logout);

// Admin only — create new users
router.post('/register', protect, authorize('super_admin', 'admin'), validate(registerSchema), authController.register);

module.exports = router;
