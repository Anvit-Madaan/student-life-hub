const Schedule = require('../models/Schedule');

exports.getSchedule = async (req, res) => {
  const events = await Schedule.find({ user: req.user._id }).sort('start');
  res.json(events);
};

exports.createSchedule = async (req, res) => {
  const event = await Schedule.create({ user: req.user._id, ...req.body });
  res.status(201).json(event);
};

exports.updateSchedule = async (req, res) => {
  const event = await Schedule.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true });
  if (!event) return res.status(404).json({ error: 'Schedule item not found' });
  res.json(event);
};

exports.deleteSchedule = async (req, res) => {
  const event = await Schedule.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!event) return res.status(404).json({ error: 'Schedule item not found' });
  res.json({ success: true });
};
