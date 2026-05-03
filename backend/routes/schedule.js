const express = require('express');
const auth = require('../middleware/auth');
const { getSchedule, createSchedule, updateSchedule, deleteSchedule } = require('../controllers/scheduleController');
const router = express.Router();

router.use(auth);
router.get('/', getSchedule);
router.post('/', createSchedule);
router.put('/:id', updateSchedule);
router.delete('/:id', deleteSchedule);

module.exports = router;
