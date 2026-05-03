const express = require('express');
const auth = require('../middleware/auth');
const { getJournal, createJournal, updateJournal, deleteJournal } = require('../controllers/journalController');
const router = express.Router();

router.use(auth);
router.get('/', getJournal);
router.post('/', createJournal);
router.put('/:id', updateJournal);
router.delete('/:id', deleteJournal);

module.exports = router;
