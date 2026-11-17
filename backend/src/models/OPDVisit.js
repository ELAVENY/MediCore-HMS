const mongoose = require('mongoose');

const opdVisitSchema = new mongoose.Schema({
  visitId: { type: String, unique: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  visitDate: { type: Date, default: Date.now },
  chiefComplaint: { type: String, required: true },
  diagnosis: { type: String },
  clinicalNotes: { type: String },
  treatmentPlan: { type: String },
  vitals: {
    bloodPressure: String,
    heartRate: Number,
    temperature: Number,
    oxygenSaturation: Number,
    weight: Number,
    height: Number,
    bloodSugar: Number,
  },
  followUpDate: { type: Date },
  status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
  registeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

opdVisitSchema.pre('save', async function (next) {
  if (this.isNew && !this.visitId) {
    const count = await mongoose.model('OPDVisit').countDocuments();
    this.visitId = `OPD-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('OPDVisit', opdVisitSchema);
