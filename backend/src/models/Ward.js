const mongoose = require('mongoose');

const wardSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  type: { type: String, enum: ['General','ICU','NICU','Maternity','Surgical','Pediatric','Oncology'], required: true },
  floor: { type: Number },
  totalBeds: { type: Number, required: true, min: 1 },
  description: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Ward', wardSchema);
