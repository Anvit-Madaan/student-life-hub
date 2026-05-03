const ForumPost = require('../models/ForumPost');

exports.getForumPosts = async (req, res) => {
  const posts = await ForumPost.find().sort({ createdAt: -1 }).limit(50);
  res.json(posts);
};

exports.createForumPost = async (req, res) => {
  const post = await ForumPost.create({ user: req.user._id, ...req.body });
  res.status(201).json(post);
};

exports.voteForumPost = async (req, res) => {
  const post = await ForumPost.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  post.votes += req.body.vote === 'up' ? 1 : -1;
  await post.save();
  res.json(post);
};

exports.answerForumPost = async (req, res) => {
  const post = await ForumPost.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  post.answers.push({ user: req.user._id, text: req.body.text });
  await post.save();
  res.json(post);
};

exports.likeAnswer = async (req, res) => {
  const post = await ForumPost.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  const answer = post.answers.id(req.params.answerId);
  if (!answer) return res.status(404).json({ error: 'Answer not found' });
  answer.likes = (answer.likes || 0) + 1;
  await post.save();
  res.json(post);
};
