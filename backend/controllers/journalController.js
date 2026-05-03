const JournalEntry = require('../models/JournalEntry');

exports.getJournal = async (req, res) => {
  const entries = await JournalEntry.find({ user: req.user._id }).sort({ date: -1 });
  res.json(entries);
};

exports.createJournal = async (req, res) => {
  const entry = await JournalEntry.create({ user: req.user._id, ...req.body });
  res.status(201).json(entry);
};

exports.updateJournal = async (req, res) => {
  const entry = await JournalEntry.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true });
  if (!entry) return res.status(404).json({ error: 'Entry not found' });
  res.json(entry);
};

exports.deleteJournal = async (req, res) => {
  const entry = await JournalEntry.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!entry) return res.status(404).json({ error: 'Entry not found' });
  res.json({ success: true });
};
