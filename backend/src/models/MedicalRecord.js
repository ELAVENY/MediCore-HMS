const mongoose = require('mongoose');

const vitalSchema = new mongoose.Schema({
  bloodPressure: String,
  heartRate: Number,
  temperature: Number,
  oxygenSaturation: Number,
  weight: Number,
  height: Number,
  bloodSugar: Number,
  recordedAt: { type: Date, default: Date.now },
}, { _id: false });

const medicalRecordSchema = new mongoose.Schema({
  recordId: { type: String, unique: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  visitType: { type: String, enum: ['OPD','IPD','Emergency'], default: 'OPD' },
  date: { type: Date, default: Date.now },
  chiefComplaint: { type: String },
  diagnosis: { type: String },
  clinicalNotes: { type: String },
  treatmentPlan: { type: String },
  vitals: vitalSchema,
  followUpDate: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

medicalRecordSchema.pre('save', async function (next) {
  if (this.isNew && !this.recordId) {
    const count = await mongoose.model('MedicalRecord').countDocuments();
    this.recordId = `REC-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
