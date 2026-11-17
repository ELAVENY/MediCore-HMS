const mongoose = require('mongoose');

const prescriptionItemSchema = new mongoose.Schema({
  medicine: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  duration: { type: String, required: true },
  instructions: { type: String },
}, { _id: false });

const prescriptionSchema = new mongoose.Schema({
  prescriptionId: { type: String, unique: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  medicalRecord: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalRecord' },
  date: { type: Date, default: Date.now },
  medicines: [prescriptionItemSchema],
  notes: { type: String },
  isDispensed: { type: Boolean, default: false },
  dispensedAt: { type: Date },
  dispensedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

prescriptionSchema.pre('save', async function (next) {
  if (this.isNew && !this.prescriptionId) {
    const count = await mongoose.model('Prescription').countDocuments();
    this.prescriptionId = `RX-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
