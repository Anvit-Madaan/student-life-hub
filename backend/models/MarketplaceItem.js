const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const marketplaceItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['books', 'notes', 'stationery', 'electronics', 'furniture', 'other'], default: 'books' },
  price: { type: Number, default: 0 },
  condition: { type: String, enum: ['new', 'like new', 'used', 'fair'], default: 'used' },
  location: { type: String },
  status: { type: String, enum: ['available', 'reserved', 'sold'], default: 'available' },
  chats: [chatSchema],
  images: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('MarketplaceItem', marketplaceItemSchema);
