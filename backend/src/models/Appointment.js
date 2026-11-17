const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  appointmentId: { type: String, unique: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  type: { type: String, enum: ['OPD','Follow-up','Review','Emergency'], default: 'OPD' },
  status: {
    type: String,
    enum: ['scheduled','confirmed','completed','cancelled','no_show'],
    default: 'scheduled',
  },
  notes: { type: String },
  cancelReason: { type: String },
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

// Auto-generate appointment ID
appointmentSchema.pre('save', async function (next) {
  if (this.isNew && !this.appointmentId) {
    const count = await mongoose.model('Appointment').countDocuments();
    this.appointmentId = `APT-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Prevent double booking: same doctor + same date + same time
appointmentSchema.index({ doctor: 1, date: 1, time: 1 }, { unique: true, partialFilterExpression: { status: { $nin: ['cancelled', 'no_show'] } } });

module.exports = mongoose.model('Appointment', appointmentSchema);
