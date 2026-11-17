const RadiologyOrder = require('../models/RadiologyOrder');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/apiResponse');

const getAllOrders = async (req, res) => {
  const { page = 1, limit = 20, status, patientId } = req.query;
  const query = {};
  if (status) query.status = status;
  if (patientId) query.patient = patientId;

  const total = await RadiologyOrder.countDocuments(query);
  const orders = await RadiologyOrder.find(query)
    .populate('patient', 'patientId name')
    .populate('doctor', 'name')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return paginatedResponse(res, 'Radiology orders retrieved', orders, {
    total, page: Number(page), limit: Number(limit),
    totalPages: Math.ceil(total / limit),
  });
};

const createOrder = async (req, res) => {
  const order = await RadiologyOrder.create({ ...req.body, orderedBy: req.user._id });
  return successResponse(res, 201, 'Radiology order created', { order });
};

const updateOrder = async (req, res) => {
  const order = await RadiologyOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!order) return errorResponse(res, 404, 'Order not found');
  return successResponse(res, 200, 'Order updated', { order });
};

const uploadReport = async (req, res) => {
  const { reportText, reportFileUrl } = req.body;
  const order = await RadiologyOrder.findByIdAndUpdate(
    req.params.id,
    { reportText, reportFileUrl, status: 'completed', verifiedBy: req.user._id },
    { new: true }
  );
  if (!order) return errorResponse(res, 404, 'Order not found');
  return successResponse(res, 200, 'Report uploaded', { order });
};

module.exports = { getAllOrders, createOrder, updateOrder, uploadReport };
