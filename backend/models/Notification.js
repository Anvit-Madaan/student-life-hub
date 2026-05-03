const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['assignment', 'exam', 'deadline', 'message', 'system'], default: 'system' },
  title: { type: String, required: true },
  message: { type: String, required: true },
  dueAt: { type: Date },
  read: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
