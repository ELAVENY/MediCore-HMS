const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true }, // e.g. 'CREATE_PATIENT', 'UPDATE_INVOICE'
  module: { type: String, required: true }, // e.g. 'patients', 'billing'
  resourceId: { type: String },
  details: { type: mongoose.Schema.Types.Mixed },
  ipAddress: { type: String },
  userAgent: { type: String },
}, { timestamps: true });

auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);
