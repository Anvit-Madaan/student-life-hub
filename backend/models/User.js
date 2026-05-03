const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  college: { type: String },
  course: { type: String },
  semester: { type: String },
  avatar: { type: String },
  bio: { type: String },
  profileStats: {
    tasksCompleted: { type: Number, default: 0 },
    studyHours: { type: Number, default: 0 },
    streakDays: { type: Number, default: 0 }
  },
  achievements: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
