const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({ dueAt: 1, createdAt: -1 });
  res.json(notifications);
};

exports.markRead = async (req, res) => {
  const ids = req.body.ids || [];
  await Notification.updateMany({ user: req.user._id, _id: { $in: ids } }, { read: true });
  res.json({ success: true });
};
