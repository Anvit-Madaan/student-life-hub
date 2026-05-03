const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  details: { type: String },
  dueDate: { type: Date },
  priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
  category: { type: String, enum: ['assignment', 'personal', 'study', 'urgent', 'other'], default: 'assignment' },
  status: { type: String, enum: ['pending', 'completed', 'archived'], default: 'pending' },
  streak: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
