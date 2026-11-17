const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patientId: { type: String, unique: true },
  name: { type: String, required: true, trim: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  bloodGroup: { type: String, enum: ['A+','A-','B+','B-','AB+','AB-','O+','O-'] },
  phone: { type: String, required: true },
  email: { type: String, lowercase: true },
  address: { type: String },
  city: { type: String },
  emergencyContact: {
    name: String,
    phone: String,
    relation: String,
  },
  medicalHistory: { type: String },
  allergies: [String],
  assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  status: { type: String, enum: ['active','admitted','discharged','critical','inactive'], default: 'active' },
  registeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

// Auto-generate patient ID
patientSchema.pre('save', async function (next) {
  if (this.isNew && !this.patientId) {
    const count = await mongoose.model('Patient').countDocuments();
    this.patientId = `P-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Virtual: age
patientSchema.virtual('age').get(function () {
  if (!this.dateOfBirth) return null;
  const diff = Date.now() - new Date(this.dateOfBirth).getTime();
  return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
});

patientSchema.set('toJSON', { virtuals: true });
patientSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Patient', patientSchema);
