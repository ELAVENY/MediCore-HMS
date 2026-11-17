const BloodDonor = require('../models/BloodInventory');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/apiResponse');

const getAllDonors = async (req, res) => {
  const { page = 1, limit = 20, bloodGroup, status } = req.query;
  const query = {};
  if (bloodGroup) query.bloodGroup = bloodGroup;
  if (status) query.status = status;

  const total = await BloodDonor.countDocuments(query);
  const donors = await BloodDonor.find(query)
    .sort({ donationDate: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return paginatedResponse(res, 'Donors retrieved', donors, {
    total, page: Number(page), limit: Number(limit),
    totalPages: Math.ceil(total / limit),
  });
};

const getBloodStock = async (req, res) => {
  const groups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const stock = await Promise.all(groups.map(async (group) => {
    const units = await BloodDonor.aggregate([
      { $match: { bloodGroup: group, status: 'available', expiryDate: { $gt: new Date() } } },
      { $group: { _id: null, total: { $sum: '$units' } } },
    ]);
    return { group, units: units[0]?.total || 0 };
  }));
  return successResponse(res, 200, 'Blood stock retrieved', { stock });
};

const registerDonor = async (req, res) => {
  const donor = await BloodDonor.create(req.body);
  return successResponse(res, 201, 'Donor registered', { donor });
};

const updateDonor = async (req, res) => {
  const donor = await BloodDonor.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!donor) return errorResponse(res, 404, 'Donor not found');
  return successResponse(res, 200, 'Donor updated', { donor });
};

module.exports = { getAllDonors, getBloodStock, registerDonor, updateDonor };
