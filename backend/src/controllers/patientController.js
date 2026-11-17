const Patient = require('../models/Patient');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/apiResponse');

// GET /api/patients
const getAllPatients = async (req, res) => {
  const { page = 1, limit = 20, search = '', status } = req.query;
  const query = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { patientId: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
    ];
  }
  if (status) query.status = status;

  const total = await Patient.countDocuments(query);
  const patients = await Patient.find(query)
    .populate('assignedDoctor', 'name specialization')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return paginatedResponse(res, 'Patients retrieved', patients, {
    total, page: Number(page), limit: Number(limit),
    totalPages: Math.ceil(total / limit),
  });
};

// GET /api/patients/:id
const getPatientById = async (req, res) => {
  const patient = await Patient.findById(req.params.id).populate('assignedDoctor', 'name specialization department');
  if (!patient) return errorResponse(res, 404, 'Patient not found');
  return successResponse(res, 200, 'Patient retrieved', { patient });
};

// POST /api/patients
const createPatient = async (req, res) => {
  const patient = await Patient.create({ ...req.body, registeredBy: req.user._id });
  return successResponse(res, 201, 'Patient registered successfully', { patient });
};

// PUT /api/patients/:id
const updatePatient = async (req, res) => {
  const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!patient) return errorResponse(res, 404, 'Patient not found');
  return successResponse(res, 200, 'Patient updated', { patient });
};

// DELETE /api/patients/:id (soft delete)
const deletePatient = async (req, res) => {
  const patient = await Patient.findByIdAndUpdate(req.params.id, { status: 'inactive' }, { new: true });
  if (!patient) return errorResponse(res, 404, 'Patient not found');
  return successResponse(res, 200, 'Patient deactivated');
};

module.exports = { getAllPatients, getPatientById, createPatient, updatePatient, deletePatient };
