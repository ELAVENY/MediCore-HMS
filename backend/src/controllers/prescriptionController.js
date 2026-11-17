const Prescription = require('../models/Prescription');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/apiResponse');

const getAllPrescriptions = async (req, res) => {
  const { page = 1, limit = 20, patientId, isDispensed } = req.query;
  const query = {};
  if (patientId) query.patient = patientId;
  if (isDispensed !== undefined) query.isDispensed = isDispensed === 'true';

  const total = await Prescription.countDocuments(query);
  const prescriptions = await Prescription.find(query)
    .populate('patient', 'patientId name')
    .populate('doctor', 'name specialization')
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return paginatedResponse(res, 'Prescriptions retrieved', prescriptions, {
    total, page: Number(page), limit: Number(limit),
    totalPages: Math.ceil(total / limit),
  });
};

const getPrescriptionById = async (req, res) => {
  const rx = await Prescription.findById(req.params.id)
    .populate('patient', 'patientId name phone dateOfBirth')
    .populate('doctor', 'name specialization qualification');
  if (!rx) return errorResponse(res, 404, 'Prescription not found');
  return successResponse(res, 200, 'Prescription retrieved', { prescription: rx });
};

const createPrescription = async (req, res) => {
  const rx = await Prescription.create({ ...req.body, createdBy: req.user._id });
  return successResponse(res, 201, 'Prescription created', { prescription: rx });
};

const dispensePrescription = async (req, res) => {
  const rx = await Prescription.findById(req.params.id);
  if (!rx) return errorResponse(res, 404, 'Prescription not found');
  if (rx.isDispensed) return errorResponse(res, 400, 'Already dispensed');

  rx.isDispensed = true;
  rx.dispensedAt = new Date();
  rx.dispensedBy = req.user._id;
  await rx.save();

  return successResponse(res, 200, 'Prescription dispensed', { prescription: rx });
};

module.exports = { getAllPrescriptions, getPrescriptionById, createPrescription, dispensePrescription };
