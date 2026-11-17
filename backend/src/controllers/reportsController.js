const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Invoice = require('../models/Invoice');
const Medicine = require('../models/Medicine');
const Admission = require('../models/Admission');
const OPDVisit = require('../models/OPDVisit');
const { successResponse } = require('../utils/apiResponse');

// Monthly patient + revenue trend (last 6 months)
const getMonthlyTrend = async (req, res) => {
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    months.push({ year: d.getFullYear(), month: d.getMonth() });
  }

  const data = await Promise.all(months.map(async ({ year, month }) => {
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0, 23, 59, 59);
    const [patients, revenue] = await Promise.all([
      Patient.countDocuments({ createdAt: { $gte: start, $lte: end } }),
      Invoice.aggregate([
        { $match: { createdAt: { $gte: start, $lte: end } } },
        { $group: { _id: null, total: { $sum: '$paidAmount' } } },
      ]),
    ]);
    return {
      month: start.toLocaleString('default', { month: 'short' }),
      year,
      patients,
      revenue: revenue[0]?.total || 0,
    };
  }));

  return successResponse(res, 200, 'Monthly trend', { data });
};

// Department-wise patient count
const getDepartmentStats = async (req, res) => {
  const stats = await Appointment.aggregate([
    { $lookup: { from: 'doctors', localField: 'doctor', foreignField: '_id', as: 'doctorInfo' } },
    { $unwind: '$doctorInfo' },
    { $group: { _id: '$doctorInfo.department', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 8 },
  ]);
  return successResponse(res, 200, 'Department stats', { stats });
};

// Summary numbers for reports page
const getSummaryReport = async (req, res) => {
  const [
    totalPatients, totalDoctors, totalAppointments,
    totalRevenue, totalAdmissions, opdToday,
  ] = await Promise.all([
    Patient.countDocuments(),
    require('../models/Doctor').countDocuments({ status: 'active' }),
    Appointment.countDocuments(),
    Invoice.aggregate([{ $group: { _id: null, total: { $sum: '$paidAmount' } } }]),
    Admission.countDocuments(),
    OPDVisit.countDocuments({
      visitDate: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lte: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    }),
  ]);

  return successResponse(res, 200, 'Summary report', {
    totalPatients,
    totalDoctors,
    totalAppointments,
    totalRevenue: totalRevenue[0]?.total || 0,
    totalAdmissions,
    opdToday,
  });
};

module.exports = { getMonthlyTrend, getDepartmentStats, getSummaryReport };
