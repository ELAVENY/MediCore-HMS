const Doctor = require('../models/Doctor');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/apiResponse');

const getAllDoctors = async (req, res) => {
  const { page = 1, limit = 20, search = '', department, status } = req.query;
  const query = {};
  if (search) query.$or = [
    { name: { $regex: search, $options: 'i' } },
    { specialization: { $regex: search, $options: 'i' } },
  ];
  if (department) query.department = department;
  if (status) query.status = status;

  const total = await Doctor.countDocuments(query);
  const doctors = await Doctor.find(query)
    .sort({ name: 1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return paginatedResponse(res, 'Doctors retrieved', doctors, {
    total, page: Number(page), limit: Number(limit),
    totalPages: Math.ceil(total / limit),
  });
};

const getDoctorById = async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) return errorResponse(res, 404, 'Doctor not found');
  return successResponse(res, 200, 'Doctor retrieved', { doctor });
};

const createDoctor = async (req, res) => {
  const doctor = await Doctor.create(req.body);
  return successResponse(res, 201, 'Doctor registered', { doctor });
};

const updateDoctor = async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!doctor) return errorResponse(res, 404, 'Doctor not found');
  return successResponse(res, 200, 'Doctor updated', { doctor });
};

const deleteDoctor = async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, { status: 'inactive' }, { new: true });
  if (!doctor) return errorResponse(res, 404, 'Doctor not found');
  return successResponse(res, 200, 'Doctor deactivated');
};

module.exports = { getAllDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor };
