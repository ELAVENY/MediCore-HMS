const mongoose = require('mongoose');

const bedSchema = new mongoose.Schema({
  bedNumber: { type: String, required: true },
  ward: { type: mongoose.Schema.Types.ObjectId, ref: 'Ward', required: true },
  type: { type: String, enum: ['General','ICU','Private','Semi-Private'], default: 'General' },
  status: { type: String, enum: ['available','occupied','maintenance','reserved'], default: 'available' },
  currentPatient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', default: null },
  currentAdmission: { type: mongoose.Schema.Types.ObjectId, ref: 'Admission', default: null },
  dailyCharge: { type: Number, default: 0 },
}, { timestamps: true });

bedSchema.index({ bedNumber: 1, ward: 1 }, { unique: true });

module.exports = mongoose.model('Bed', bedSchema);
