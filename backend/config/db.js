const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const rawUri = process.env.MONGO_URI;
    if (!rawUri) {
      throw new Error('MONGO_URI is not defined in environment variables.');
    }

    const parsed = new URL(rawUri);
    const hasDatabase = parsed.pathname && parsed.pathname !== '/';
    if (!hasDatabase || parsed.pathname !== '/student-life-hub') {
      parsed.pathname = '/student-life-hub';
    }

    const uri = parsed.toString();
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
    console.log(`Using database: ${conn.connection.name}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
