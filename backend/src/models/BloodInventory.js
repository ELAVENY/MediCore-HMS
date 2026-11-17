const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  donorId: { type: String, unique: true },
  name: { type: String, required: true },
  bloodGroup: { type: String, enum: ['A+','A-','B+','B-','AB+','AB-','O+','O-'], required: true },
  phone: { type: String },
  email: { type: String },
  donationDate: { type: Date, default: Date.now },
  units: { type: Number, default: 1 },
  expiryDate: { type: Date },
  status: { type: String, enum: ['available','used','expired'], default: 'available' },
  notes: { type: String },
}, { timestamps: true });

donorSchema.pre('save', async function (next) {
  if (this.isNew && !this.donorId) {
    const count = await mongoose.model('BloodDonor').countDocuments();
    this.donorId = `DON-${String(count + 1).padStart(3, '0')}`;
  }
  // Blood expires after 42 days
  if (!this.expiryDate) {
    this.expiryDate = new Date(this.donationDate);
    this.expiryDate.setDate(this.expiryDate.getDate() + 42);
  }
  next();
});

module.exports = mongoose.model('BloodDonor', donorSchema);
