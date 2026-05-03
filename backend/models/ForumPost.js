const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 }
});

const forumPostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  anonymous: { type: Boolean, default: false },
  category: { type: String, enum: ['study', 'career', 'mental health', 'college life', 'other'], default: 'study' },
  title: { type: String, required: true },
  body: { type: String, required: true },
  answers: [answerSchema],
  votes: { type: Number, default: 0 },
  tags: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('ForumPost', forumPostSchema);
