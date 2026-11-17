const Appointment = require('../models/Appointment');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/apiResponse');

const getAllAppointments = async (req, res) => {
  const { page = 1, limit = 20, date, doctorId, status } = req.query;
  const query = {};
  if (date) {
    const start = new Date(date); start.setHours(0, 0, 0, 0);
    const end = new Date(date); end.setHours(23, 59, 59, 999);
    query.date = { $gte: start, $lte: end };
  }
  if (doctorId) query.doctor = doctorId;
  if (status) query.status = status;

  const total = await Appointment.countDocuments(query);
  const appointments = await Appointment.find(query)
    .populate('patient', 'patientId name phone')
    .populate('doctor', 'name specialization')
    .sort({ date: 1, time: 1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return paginatedResponse(res, 'Appointments retrieved', appointments, {
    total, page: Number(page), limit: Number(limit),
    totalPages: Math.ceil(total / limit),
  });
};

const createAppointment = async (req, res) => {
  // Check for conflicting appointment
  const { doctor, date, time } = req.body;
  const existing = await Appointment.findOne({
    doctor, time,
    date: { $gte: new Date(new Date(date).setHours(0,0,0,0)), $lte: new Date(new Date(date).setHours(23,59,59,999)) },
    status: { $nin: ['cancelled', 'no_show'] },
  });
  if (existing) return errorResponse(res, 409, 'Doctor already has an appointment at this time.');

  const appointment = await Appointment.create({ ...req.body, bookedBy: req.user._id });
  return successResponse(res, 201, 'Appointment booked', { appointment });
};

const updateAppointment = async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!appointment) return errorResponse(res, 404, 'Appointment not found');
  return successResponse(res, 200, 'Appointment updated', { appointment });
};

const cancelAppointment = async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status: 'cancelled', cancelReason: req.body.reason },
    { new: true }
  );
  if (!appointment) return errorResponse(res, 404, 'Appointment not found');
  return successResponse(res, 200, 'Appointment cancelled', { appointment });
};

module.exports = { getAllAppointments, createAppointment, updateAppointment, cancelAppointment };
