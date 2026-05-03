const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const scheduleRoutes = require('./routes/schedule');
const taskRoutes = require('./routes/tasks');
const journalRoutes = require('./routes/journal');
const forumRoutes = require('./routes/forum');
const marketplaceRoutes = require('./routes/marketplace');
const resourceRoutes = require('./routes/resources');
const notificationRoutes = require('./routes/notifications');
const profileRoutes = require('./routes/profile');

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/profile', profileRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Student Life Hub API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
