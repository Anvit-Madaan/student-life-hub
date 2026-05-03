const express = require('express');
const auth = require('../middleware/auth');
const { getNotifications, markRead } = require('../controllers/notificationController');
const router = express.Router();

router.use(auth);
router.get('/', getNotifications);
router.post('/read', markRead);

module.exports = router;
