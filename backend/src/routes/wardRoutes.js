const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const c = require('../controllers/wardController');

router.use(protect);
router.get('/', c.getAllWards);
router.post('/', authorize('super_admin','admin'), c.createWard);
router.get('/beds', c.getAllBeds);
router.post('/beds', authorize('super_admin','admin'), c.createBed);
router.patch('/beds/:id/status', authorize('super_admin','admin','nurse'), c.updateBedStatus);

module.exports = router;
