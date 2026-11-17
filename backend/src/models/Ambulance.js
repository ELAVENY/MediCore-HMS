const mongoose = require('mongoose');

const ambulanceSchema = new mongoose.Schema({
  vehicleId: { type: String, unique: true },
  registrationNumber: { type: String, required: true, unique: true },
  type: { type: String, enum: ['ALS','BLS','Patient Transport'], default: 'BLS' },
  driverName: { type: String, required: true },
  driverPhone: { type: String, required: true },
  status: { type: String, enum: ['available','dispatched','maintenance','inactive'], default: 'available' },
  currentLocation: { type: String },
  lastServiced: { type: Date },
  notes: { type: String },
}, { timestamps: true });

ambulanceSchema.pre('save', async function (next) {
  if (this.isNew && !this.vehicleId) {
    const count = await mongoose.model('Ambulance').countDocuments();
    this.vehicleId = `AMB-${String(count + 1).padStart(3, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Ambulance', ambulanceSchema);
