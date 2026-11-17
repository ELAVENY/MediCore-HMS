const Medicine = require('../models/Medicine');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/apiResponse');

const getAllMedicines = async (req, res) => {
  const { page = 1, limit = 20, search = '', category, lowStock } = req.query;
  const query = {};
  if (search) query.$or = [
    { name: { $regex: search, $options: 'i' } },
    { genericName: { $regex: search, $options: 'i' } },
    { medicineId: { $regex: search, $options: 'i' } },
  ];
  if (category) query.category = category;
  if (lowStock === 'true') query.$expr = { $lte: ['$stock', '$reorderLevel'] };

  const total = await Medicine.countDocuments(query);
  const medicines = await Medicine.find(query)
    .sort({ name: 1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return paginatedResponse(res, 'Medicines retrieved', medicines, {
    total, page: Number(page), limit: Number(limit),
    totalPages: Math.ceil(total / limit),
  });
};

const getMedicineById = async (req, res) => {
  const medicine = await Medicine.findById(req.params.id);
  if (!medicine) return errorResponse(res, 404, 'Medicine not found');
  return successResponse(res, 200, 'Medicine retrieved', { medicine });
};

const createMedicine = async (req, res) => {
  const medicine = await Medicine.create(req.body);
  return successResponse(res, 201, 'Medicine added', { medicine });
};

const updateMedicine = async (req, res) => {
  const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!medicine) return errorResponse(res, 404, 'Medicine not found');
  return successResponse(res, 200, 'Medicine updated', { medicine });
};

const dispenseMedicine = async (req, res) => {
  const { quantity } = req.body;
  const medicine = await Medicine.findById(req.params.id);
  if (!medicine) return errorResponse(res, 404, 'Medicine not found');
  if (medicine.stock < quantity) return errorResponse(res, 400, `Insufficient stock. Available: ${medicine.stock}`);

  medicine.stock -= quantity;
  await medicine.save();

  return successResponse(res, 200, 'Medicine dispensed', { medicine });
};

const getLowStockAlerts = async (req, res) => {
  const medicines = await Medicine.find({ $expr: { $lte: ['$stock', '$reorderLevel'] }, isActive: true });
  return successResponse(res, 200, 'Low stock medicines', { count: medicines.length, medicines });
};

module.exports = { getAllMedicines, getMedicineById, createMedicine, updateMedicine, dispenseMedicine, getLowStockAlerts };
