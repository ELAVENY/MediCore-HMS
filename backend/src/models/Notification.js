const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['info', 'warning', 'success', 'error'], default: 'info' },
  category: { type: String, enum: ['appointment', 'lab', 'pharmacy', 'billing', 'admission', 'general'], default: 'general' },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isRead: { type: Boolean, default: false },
  link: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
