const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env') });
const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.API_KEY;
  
  if (!uri) {
    console.error('CRITICAL: MongoDB URI is undefined. Please set MONGODB_URI or API_KEY environment variables.');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }); 
    console.log('MongoDB connected successfully');
  } catch (error) { 
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
