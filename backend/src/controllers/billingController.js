const Invoice = require('../models/Invoice');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/apiResponse');

const getAllInvoices = async (req, res) => {
  const { page = 1, limit = 20, status, patientId } = req.query;
  const query = {};
  if (status) query.status = status;
  if (patientId) query.patient = patientId;

  const total = await Invoice.countDocuments(query);
  const invoices = await Invoice.find(query)
    .populate('patient', 'patientId name phone')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return paginatedResponse(res, 'Invoices retrieved', invoices, {
    total, page: Number(page), limit: Number(limit),
    totalPages: Math.ceil(total / limit),
  });
};

const getInvoiceById = async (req, res) => {
  const invoice = await Invoice.findById(req.params.id).populate('patient', 'patientId name phone address');
  if (!invoice) return errorResponse(res, 404, 'Invoice not found');
  return successResponse(res, 200, 'Invoice retrieved', { invoice });
};

const createInvoice = async (req, res) => {
  const { items, discount = 0, tax = 0 } = req.body;
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const totalAmount = subtotal - discount + tax;

  const invoice = await Invoice.create({
    ...req.body,
    subtotal,
    totalAmount,
    balanceAmount: totalAmount,
    generatedBy: req.user._id,
  });
  return successResponse(res, 201, 'Invoice created', { invoice });
};

const recordPayment = async (req, res) => {
  const invoice = await Invoice.findById(req.params.id);
  if (!invoice) return errorResponse(res, 404, 'Invoice not found');
  if (invoice.status === 'paid') return errorResponse(res, 400, 'Invoice already fully paid');

  const { amount, method, transactionId } = req.body;
  if (amount > invoice.balanceAmount) return errorResponse(res, 400, `Payment exceeds balance of ₹${invoice.balanceAmount}`);

  invoice.payments.push({ amount, method, transactionId, receivedBy: req.user._id });
  invoice.paidAmount += amount;
  await invoice.save(); // pre-save handles status and balance

  return successResponse(res, 200, 'Payment recorded', { invoice });
};

const getRevenueSummary = async (req, res) => {
  const result = await Invoice.aggregate([
    { $match: { status: { $in: ['paid', 'partial'] } } },
    { $group: { _id: null, totalRevenue: { $sum: '$paidAmount' }, totalOutstanding: { $sum: '$balanceAmount' }, count: { $sum: 1 } } },
  ]);
  return successResponse(res, 200, 'Revenue summary', result[0] || { totalRevenue: 0, totalOutstanding: 0, count: 0 });
};

module.exports = { getAllInvoices, getInvoiceById, createInvoice, recordPayment, getRevenueSummary };
