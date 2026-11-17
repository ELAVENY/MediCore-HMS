const Ward = require('../models/Ward');
const Bed = require('../models/Bed');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const getAllWards = async (req, res) => {
  const wards = await Ward.find({ isActive: true }).sort({ name: 1 });
  // Attach bed counts
  const wardsWithBeds = await Promise.all(wards.map(async (ward) => {
    const total = await Bed.countDocuments({ ward: ward._id });
    const occupied = await Bed.countDocuments({ ward: ward._id, status: 'occupied' });
    const available = await Bed.countDocuments({ ward: ward._id, status: 'available' });
    return { ...ward.toObject(), totalBeds: total, occupied, available };
  }));
  return successResponse(res, 200, 'Wards retrieved', { wards: wardsWithBeds });
};

const createWard = async (req, res) => {
  const ward = await Ward.create(req.body);
  return successResponse(res, 201, 'Ward created', { ward });
};

const getAllBeds = async (req, res) => {
  const { wardId, status } = req.query;
  const query = {};
  if (wardId) query.ward = wardId;
  if (status) query.status = status;
  const beds = await Bed.find(query).populate('ward', 'name type').populate('currentPatient', 'patientId name');
  return successResponse(res, 200, 'Beds retrieved', { beds });
};

const createBed = async (req, res) => {
  const bed = await Bed.create(req.body);
  return successResponse(res, 201, 'Bed created', { bed });
};

const updateBedStatus = async (req, res) => {
  const bed = await Bed.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!bed) return errorResponse(res, 404, 'Bed not found');
  return successResponse(res, 200, 'Bed status updated', { bed });
};

module.exports = { getAllWards, createWard, getAllBeds, createBed, updateBedStatus };
