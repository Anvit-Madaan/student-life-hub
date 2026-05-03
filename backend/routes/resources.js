const express = require('express');
const auth = require('../middleware/auth');
const { getResources, createResource, toggleBookmark } = require('../controllers/resourceController');
const router = express.Router();

router.use(auth);
router.get('/', getResources);
router.post('/', createResource);
router.put('/:id/bookmark', toggleBookmark);

module.exports = router;
