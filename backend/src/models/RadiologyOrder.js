const mongoose = require('mongoose');

const radiologyOrderSchema = new mongoose.Schema({
  scanId: { type: String, unique: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  scanType: { type: String, required: true },
  bodyPart: { type: String },
  priority: { type: String, enum: ['Routine','Urgent'], default: 'Routine' },
  status: { type: String, enum: ['pending','scheduled','completed','cancelled'], default: 'pending' },
  scheduledAt: { type: Date },
  reportText: { type: String },
  reportFileUrl: { type: String },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  price: { type: Number, default: 0 },
  orderedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

radiologyOrderSchema.pre('save', async function (next) {
  if (this.isNew && !this.scanId) {
    const count = await mongoose.model('RadiologyOrder').countDocuments();
    this.scanId = `RAD-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('RadiologyOrder', radiologyOrderSchema);
