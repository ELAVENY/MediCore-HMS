const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const c = require('../controllers/opdController');

router.use(protect);
router.get('/', c.getAllVisits);
router.get('/:id', c.getVisitById);
router.post('/', authorize('super_admin','admin','doctor','receptionist'), c.createVisit);
router.put('/:id', authorize('super_admin','admin','doctor','nurse'), c.updateVisit);

module.exports = router;
