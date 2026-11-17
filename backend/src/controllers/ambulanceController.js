const Ambulance = require('../models/Ambulance');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/apiResponse');

const getAllAmbulances = async (req, res) => {
  const { status } = req.query;
  const query = {};
  if (status) query.status = status;
  const ambulances = await Ambulance.find(query).sort({ vehicleId: 1 });
  return successResponse(res, 200, 'Ambulances retrieved', { ambulances });
};

const createAmbulance = async (req, res) => {
  const ambulance = await Ambulance.create(req.body);
  return successResponse(res, 201, 'Ambulance added', { ambulance });
};

const updateAmbulance = async (req, res) => {
  const ambulance = await Ambulance.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!ambulance) return errorResponse(res, 404, 'Ambulance not found');
  return successResponse(res, 200, 'Ambulance updated', { ambulance });
};

const dispatchAmbulance = async (req, res) => {
  const ambulance = await Ambulance.findById(req.params.id);
  if (!ambulance) return errorResponse(res, 404, 'Ambulance not found');
  if (ambulance.status !== 'available') return errorResponse(res, 400, 'Ambulance not available');

  ambulance.status = 'dispatched';
  ambulance.currentLocation = req.body.destination;
  await ambulance.save();

  return successResponse(res, 200, 'Ambulance dispatched', { ambulance });
};

module.exports = { getAllAmbulances, createAmbulance, updateAmbulance, dispatchAmbulance };
