const MedicalRecord = require('../models/MedicalRecord');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/apiResponse');

const getAllRecords = async (req, res) => {
  const { page = 1, limit = 20, patientId } = req.query;
  const query = {};
  if (patientId) query.patient = patientId;

  const total = await MedicalRecord.countDocuments(query);
  const records = await MedicalRecord.find(query)
    .populate('patient', 'patientId name')
    .populate('doctor', 'name specialization')
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return paginatedResponse(res, 'Medical records retrieved', records, {
    total, page: Number(page), limit: Number(limit),
    totalPages: Math.ceil(total / limit),
  });
};

const getRecordById = async (req, res) => {
  const record = await MedicalRecord.findById(req.params.id)
    .populate('patient', 'patientId name phone dateOfBirth')
    .populate('doctor', 'name specialization');
  if (!record) return errorResponse(res, 404, 'Medical record not found');
  return successResponse(res, 200, 'Record retrieved', { record });
};

const createRecord = async (req, res) => {
  const record = await MedicalRecord.create({ ...req.body, createdBy: req.user._id });
  return successResponse(res, 201, 'Medical record created', { record });
};

const updateRecord = async (req, res) => {
  // Only doctor who created can update, or admin
  const record = await MedicalRecord.findById(req.params.id);
  if (!record) return errorResponse(res, 404, 'Medical record not found');

  const isAllowed = ['super_admin', 'admin'].includes(req.user.role) ||
    record.createdBy.toString() === req.user._id.toString();
  if (!isAllowed) return errorResponse(res, 403, 'Not authorized to edit this record');

  const updated = await MedicalRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
  return successResponse(res, 200, 'Record updated', { record: updated });
};

module.exports = { getAllRecords, getRecordById, createRecord, updateRecord };
