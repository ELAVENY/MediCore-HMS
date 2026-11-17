const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  medicineId: { type: String, unique: true },
  name: { type: String, required: true, trim: true },
  genericName: { type: String },
  category: {
    type: String,
    enum: ['Analgesic','Antibiotic','Antidiabetic','Antihypertensive','Antifungal',
           'Antihistamine','Antiviral','Cardiac','Vitamins','Others'],
    required: true,
  },
  form: { type: String, enum: ['Tablet','Capsule','Syrup','Injection','Cream','Drops','Inhaler'], required: true },
  strength: { type: String },
  unit: { type: String, default: 'Tablet' },
  stock: { type: Number, default: 0, min: 0 },
  reorderLevel: { type: Number, default: 20 },
  purchasePrice: { type: Number, default: 0 },
  sellingPrice: { type: Number, default: 0 },
  manufacturer: { type: String },
  expiryDate: { type: Date },
  batchNumber: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

medicineSchema.pre('save', async function (next) {
  if (this.isNew && !this.medicineId) {
    const count = await mongoose.model('Medicine').countDocuments();
    this.medicineId = `MED-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Virtual: isLowStock
medicineSchema.virtual('isLowStock').get(function () {
  return this.stock <= this.reorderLevel;
});

medicineSchema.virtual('isExpired').get(function () {
  return this.expiryDate && new Date(this.expiryDate) < new Date();
});

medicineSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Medicine', medicineSchema);
