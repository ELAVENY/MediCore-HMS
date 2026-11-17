const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  date: { type: Date, required: true },
  checkIn: { type: Date },
  checkOut: { type: Date },
  status: { type: String, enum: ['present', 'absent', 'late', 'half_day', 'on_leave'], default: 'present' },
  notes: { type: String },
  markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

attendanceSchema.index({ staff: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
