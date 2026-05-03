const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String },
  resourceType: { type: String, enum: ['notes', 'paper', 'guide', 'video', 'other'], default: 'notes' },
  tags: [{ type: String }],
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
