const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  day: { type: String, enum: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'] },
  startTime: String,
  endTime: String,
  isAvailable: { type: Boolean, default: true },
}, { _id: false });

const doctorSchema = new mongoose.Schema({
  doctorId: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true, trim: true },
  specialization: { type: String, required: true },
  department: { type: String, required: true },
  qualification: { type: String },
  experience: { type: Number, default: 0 },
  phone: { type: String },
  email: { type: String, lowercase: true },
  bio: { type: String },
  schedule: [scheduleSchema],
  consultationFee: { type: Number, default: 0 },
  status: { type: String, enum: ['active','inactive','on_leave'], default: 'active' },
}, { timestamps: true });

doctorSchema.pre('save', async function (next) {
  if (this.isNew && !this.doctorId) {
    const count = await mongoose.model('Doctor').countDocuments();
    this.doctorId = `D-${String(count + 1).padStart(3, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Doctor', doctorSchema);
