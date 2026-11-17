const OPDVisit = require('../models/OPDVisit');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/apiResponse');

const getAllVisits = async (req, res) => {
  const { page = 1, limit = 20, search = '', status, date } = req.query;
  const query = {};
  if (status) query.status = status;
  if (date) {
    const start = new Date(date); start.setHours(0, 0, 0, 0);
    const end = new Date(date); end.setHours(23, 59, 59, 999);
    query.visitDate = { $gte: start, $lte: end };
  }

  const total = await OPDVisit.countDocuments(query);
  const visits = await OPDVisit.find(query)
    .populate('patient', 'patientId name phone')
    .populate('doctor', 'name specialization')
    .sort({ visitDate: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return paginatedResponse(res, 'OPD visits retrieved', visits, {
    total, page: Number(page), limit: Number(limit),
    totalPages: Math.ceil(total / limit),
  });
};

const getVisitById = async (req, res) => {
  const visit = await OPDVisit.findById(req.params.id)
    .populate('patient', 'patientId name phone dateOfBirth bloodGroup')
    .populate('doctor', 'name specialization');
  if (!visit) return errorResponse(res, 404, 'OPD visit not found');
  return successResponse(res, 200, 'Visit retrieved', { visit });
};

const createVisit = async (req, res) => {
  const visit = await OPDVisit.create({ ...req.body, registeredBy: req.user._id });
  return successResponse(res, 201, 'OPD visit created', { visit });
};

const updateVisit = async (req, res) => {
  const visit = await OPDVisit.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!visit) return errorResponse(res, 404, 'OPD visit not found');
  return successResponse(res, 200, 'Visit updated', { visit });
};

module.exports = { getAllVisits, getVisitById, createVisit, updateVisit };
