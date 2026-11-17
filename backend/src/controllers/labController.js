const LabOrder = require('../models/LabOrder');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/apiResponse');

const getAllLabOrders = async (req, res) => {
  const { page = 1, limit = 20, status, patientId } = req.query;
  const query = {};
  if (status) query.status = status;
  if (patientId) query.patient = patientId;

  const total = await LabOrder.countDocuments(query);
  const orders = await LabOrder.find(query)
    .populate('patient', 'patientId name')
    .populate('doctor', 'name')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return paginatedResponse(res, 'Lab orders retrieved', orders, {
    total, page: Number(page), limit: Number(limit),
    totalPages: Math.ceil(total / limit),
  });
};

const createLabOrder = async (req, res) => {
  const order = await LabOrder.create({ ...req.body, orderedBy: req.user._id });
  return successResponse(res, 201, 'Lab order created', { order });
};

const updateLabOrder = async (req, res) => {
  const order = await LabOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!order) return errorResponse(res, 404, 'Lab order not found');
  return successResponse(res, 200, 'Lab order updated', { order });
};

const enterResults = async (req, res) => {
  const order = await LabOrder.findById(req.params.id);
  if (!order) return errorResponse(res, 404, 'Lab order not found');

  order.results = req.body.results;
  order.status = 'completed';
  order.sampleCollectedAt = order.sampleCollectedAt || new Date();
  await order.save();

  return successResponse(res, 200, 'Results entered', { order });
};

const verifyResult = async (req, res) => {
  const allowedRoles = ['lab_technician', 'admin', 'super_admin'];
  if (!allowedRoles.includes(req.user.role)) {
    return errorResponse(res, 403, 'Only lab technicians can verify results');
  }
  const order = await LabOrder.findByIdAndUpdate(req.params.id, {
    verifiedBy: req.user._id, verifiedAt: new Date(),
  }, { new: true });
  if (!order) return errorResponse(res, 404, 'Lab order not found');
  return successResponse(res, 200, 'Result verified', { order });
};

module.exports = { getAllLabOrders, createLabOrder, updateLabOrder, enterResults, verifyResult };
