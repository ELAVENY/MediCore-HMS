const Admission = require('../models/Admission');
const Bed = require('../models/Bed');
const Patient = require('../models/Patient');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/apiResponse');

const getAllAdmissions = async (req, res) => {
  const { page = 1, limit = 20, status } = req.query;
  const query = {};
  if (status) query.status = status;

  const total = await Admission.countDocuments(query);
  const admissions = await Admission.find(query)
    .populate('patient', 'patientId name phone')
    .populate('doctor', 'name specialization')
    .populate('ward', 'name type')
    .populate('bed', 'bedNumber type')
    .sort({ admissionDate: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return paginatedResponse(res, 'Admissions retrieved', admissions, {
    total, page: Number(page), limit: Number(limit),
    totalPages: Math.ceil(total / limit),
  });
};

const createAdmission = async (req, res) => {
  const bed = await Bed.findById(req.body.bed);
  if (!bed) return errorResponse(res, 404, 'Bed not found');
  if (bed.status !== 'available') return errorResponse(res, 409, 'Bed is not available');

  const admission = await Admission.create({ ...req.body, admittedBy: req.user._id });

  // Mark bed as occupied
  await Bed.findByIdAndUpdate(req.body.bed, {
    status: 'occupied',
    currentPatient: req.body.patient,
    currentAdmission: admission._id,
  });

  // Update patient status
  await Patient.findByIdAndUpdate(req.body.patient, { status: 'admitted' });

  return successResponse(res, 201, 'Patient admitted', { admission });
};

const dischargePatient = async (req, res) => {
  const admission = await Admission.findById(req.params.id);
  if (!admission) return errorResponse(res, 404, 'Admission not found');
  if (admission.status === 'discharged') return errorResponse(res, 400, 'Already discharged');

  admission.status = 'discharged';
  admission.dischargeDate = new Date();
  admission.dischargeNotes = req.body.notes;
  await admission.save();

  // Free the bed
  await Bed.findByIdAndUpdate(admission.bed, { status: 'available', currentPatient: null, currentAdmission: null });

  // Update patient status
  await Patient.findByIdAndUpdate(admission.patient, { status: 'discharged' });

  return successResponse(res, 200, 'Patient discharged', { admission });
};

module.exports = { getAllAdmissions, createAdmission, dischargePatient };
