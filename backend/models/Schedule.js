const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['class', 'exam', 'study', 'other'], default: 'class' },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  location: { type: String },
  priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
  recurring: { type: String, enum: ['none', 'daily', 'weekly', 'monthly'], default: 'none' }
}, { timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema);
