require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ MongoDB connected`);
      console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
    });
    
  } catch (err) {
    console.error('Server failed to start', err);
    process.exit(1);
  }
};

start();
