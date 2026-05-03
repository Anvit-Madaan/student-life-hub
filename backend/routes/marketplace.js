const express = require('express');
const auth = require('../middleware/auth');
const { getListings, createListing, updateListing, addChatMessage } = require('../controllers/marketplaceController');
const router = express.Router();

router.use(auth);
router.get('/', getListings);
router.post('/', createListing);
router.put('/:id', updateListing);
router.post('/:id/chat', addChatMessage);

module.exports = router;
