const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  admissionId: { type: String, unique: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  ward: { type: mongoose.Schema.Types.ObjectId, ref: 'Ward', required: true },
  bed: { type: mongoose.Schema.Types.ObjectId, ref: 'Bed', required: true },
  admissionDate: { type: Date, required: true, default: Date.now },
  dischargeDate: { type: Date },
  reason: { type: String, required: true },
  diagnosis: { type: String },
  status: { type: String, enum: ['admitted','discharged','transferred'], default: 'admitted' },
  dischargeNotes: { type: String },
  admittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

admissionSchema.pre('save', async function (next) {
  if (this.isNew && !this.admissionId) {
    const count = await mongoose.model('Admission').countDocuments();
    this.admissionId = `IPD-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Admission', admissionSchema);
