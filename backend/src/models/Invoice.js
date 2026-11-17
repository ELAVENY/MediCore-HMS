const mongoose = require('mongoose');

const invoiceItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  category: { type: String, enum: ['Consultation','Lab','Radiology','Pharmacy','Room','Procedure','Other'] },
  quantity: { type: Number, default: 1 },
  unitPrice: { type: Number, required: true },
  total: { type: Number, required: true },
}, { _id: false });

const paymentSchema = new mongoose.Schema({
  amount: Number,
  method: { type: String, enum: ['Cash','Card','UPI','Insurance','Other'] },
  paidAt: { type: Date, default: Date.now },
  transactionId: String,
  receivedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { _id: true });

const invoiceSchema = new mongoose.Schema({
  invoiceNo: { type: String, unique: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  admission: { type: mongoose.Schema.Types.ObjectId, ref: 'Admission' },
  items: [invoiceItemSchema],
  subtotal: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  paidAmount: { type: Number, default: 0 },
  balanceAmount: { type: Number, default: 0 },
  status: { type: String, enum: ['unpaid','partial','paid','cancelled'], default: 'unpaid' },
  payments: [paymentSchema],
  notes: { type: String },
  generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dueDate: { type: Date },
}, { timestamps: true });

invoiceSchema.pre('save', async function (next) {
  if (this.isNew && !this.invoiceNo) {
    const count = await mongoose.model('Invoice').countDocuments();
    this.invoiceNo = `INV-${String(count + 1).padStart(4, '0')}`;
  }
  // Auto-compute balance
  this.balanceAmount = this.totalAmount - this.paidAmount;
  if (this.paidAmount >= this.totalAmount) this.status = 'paid';
  else if (this.paidAmount > 0) this.status = 'partial';
  else this.status = 'unpaid';
  next();
});

module.exports = mongoose.model('Invoice', invoiceSchema);
