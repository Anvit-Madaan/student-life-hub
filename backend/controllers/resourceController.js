const Resource = require('../models/Resource');

exports.getResources = async (req, res) => {
  const filter = {};
  if (req.query.subject) filter.subject = req.query.subject;
  const resources = await Resource.find(filter).sort({ createdAt: -1 });
  res.json(resources);
};

exports.createResource = async (req, res) => {
  const resource = await Resource.create({ user: req.user._id, ...req.body });
  res.status(201).json(resource);
};

exports.toggleBookmark = async (req, res) => {
  const resource = await Resource.findById(req.params.id);
  if (!resource) return res.status(404).json({ error: 'Resource not found' });
  const index = resource.bookmarks.indexOf(req.user._id);
  if (index >= 0) {
    resource.bookmarks.splice(index, 1);
  } else {
    resource.bookmarks.push(req.user._id);
  }
  await resource.save();
  res.json(resource);
};
