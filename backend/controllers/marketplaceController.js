const MarketplaceItem = require('../models/MarketplaceItem');

exports.getListings = async (req, res) => {
  const filters = { status: 'available' };
  if (req.query.category) filters.category = req.query.category;
  if (req.query.location) filters.location = req.query.location;
  const items = await MarketplaceItem.find(filters).sort({ createdAt: -1 });
  res.json(items);
};

exports.createListing = async (req, res) => {
  const listing = await MarketplaceItem.create({ user: req.user._id, ...req.body });
  res.status(201).json(listing);
};

exports.updateListing = async (req, res) => {
  const item = await MarketplaceItem.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true });
  if (!item) return res.status(404).json({ error: 'Listing not found' });
  res.json(item);
};

exports.addChatMessage = async (req, res) => {
  const item = await MarketplaceItem.findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Listing not found' });
  item.chats.push({ sender: req.user._id, message: req.body.message });
  await item.save();
  res.json(item);
};
