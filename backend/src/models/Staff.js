const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  staffId: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ['Nurse','Receptionist','Pharmacist','Lab Technician','Radiologist','Accountant','HR','Driver','Security','Housekeeping'],
    required: true,
  },
  department: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  shift: { type: String, enum: ['Morning','Evening','Night'], default: 'Morning' },
  joinDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['active','inactive','on_leave'], default: 'active' },
}, { timestamps: true });

staffSchema.pre('save', async function (next) {
  if (this.isNew && !this.staffId) {
    const count = await mongoose.model('Staff').countDocuments();
    this.staffId = `STF-${String(count + 1).padStart(3, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Staff', staffSchema);
