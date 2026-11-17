const mongoose = require('mongoose');

const labResultSchema = new mongoose.Schema({
  parameter: String,
  value: String,
  unit: String,
  normalRange: String,
  isAbnormal: { type: Boolean, default: false },
}, { _id: false });

const labOrderSchema = new mongoose.Schema({
  labOrderId: { type: String, unique: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  testName: { type: String, required: true },
  testCode: { type: String },
  priority: { type: String, enum: ['Routine','Urgent','STAT'], default: 'Routine' },
  status: { type: String, enum: ['pending','sample_collected','processing','completed','cancelled'], default: 'pending' },
  sampleCollectedAt: { type: Date },
  results: [labResultSchema],
  remarks: { type: String },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  verifiedAt: { type: Date },
  price: { type: Number, default: 0 },
  orderedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

labOrderSchema.pre('save', async function (next) {
  if (this.isNew && !this.labOrderId) {
    const count = await mongoose.model('LabOrder').countDocuments();
    this.labOrderId = `LAB-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('LabOrder', labOrderSchema);
