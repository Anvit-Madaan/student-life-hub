const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: () => new Date() },
  text: { type: String, required: true },
  mood: { type: String, enum: ['happy', 'thoughtful', 'stressed', 'motivated', 'tired', 'neutral'], default: 'neutral' },
  tags: [{ type: String }],
  private: { type: Boolean, default: true }
}, { timestamps: true });

journalEntrySchema.index({ text: 'text', tags: 'text' });

module.exports = mongoose.model('JournalEntry', journalEntrySchema);
