const express = require('express');
const auth = require('../middleware/auth');
const { getForumPosts, createForumPost, voteForumPost, answerForumPost, likeAnswer } = require('../controllers/forumController');
const router = express.Router();

router.use(auth);
router.get('/', getForumPosts);
router.post('/', createForumPost);
router.put('/:id/vote', voteForumPost);
router.post('/:id/answer', answerForumPost);
router.put('/:id/answer/:answerId/like', likeAnswer);

module.exports = router;
