const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const Admission = require('../models/Admission');
const Invoice = require('../models/Invoice');
const Medicine = require('../models/Medicine');
const LabOrder = require('../models/LabOrder');
const { successResponse } = require('../utils/apiResponse');

const getDashboardStats = async (req, res) => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  const [
    totalPatients,
    activeDoctors,
    todayAppointments,
    currentAdmissions,
    pendingLabOrders,
    lowStockMedicines,
    revenueToday,
    newPatientsToday,
  ] = await Promise.all([
    Patient.countDocuments({ status: { $ne: 'inactive' } }),
    Doctor.countDocuments({ status: 'active' }),
    Appointment.countDocuments({ date: { $gte: startOfDay, $lte: endOfDay }, status: { $ne: 'cancelled' } }),
    Admission.countDocuments({ status: 'admitted' }),
    LabOrder.countDocuments({ status: { $in: ['pending', 'sample_collected', 'processing'] } }),
    Medicine.countDocuments({ $expr: { $lte: ['$stock', '$reorderLevel'] }, isActive: true }),
    Invoice.aggregate([{ $match: { createdAt: { $gte: startOfDay, $lte: endOfDay } } }, { $group: { _id: null, total: { $sum: '$paidAmount' } } }]),
    Patient.countDocuments({ createdAt: { $gte: startOfDay, $lte: endOfDay } }),
  ]);

  return successResponse(res, 200, 'Dashboard stats', {
    totalPatients,
    activeDoctors,
    todayAppointments,
    currentAdmissions,
    pendingLabOrders,
    lowStockMedicines,
    revenueToday: revenueToday[0]?.total || 0,
    newPatientsToday,
  });
};

module.exports = { getDashboardStats };
