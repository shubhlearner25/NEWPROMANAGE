const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// Load environment variables from .env file
dotenv.config({ path: './.env' });

// Log the current environment
console.log('Environment:', process.env.NODE_ENV);

// Explicitly log the environment variables to verify they are loaded correctly
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception 💥');
  console.error(err.name, err.message);
  process.exit(1);
});

// Check if MONGODB_URI is undefined or empty
if (!process.env.MONGODB_URI) {
  console.error('MongoDB URI is undefined. Please set the MONGODB_URI environment variable.');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Connected to database');
  })
  .catch((err) => {
    console.error('Database connection error 💥');
    console.error(err.name, err.message);
    process.exit(1);
  });

// Start the server
const server = app.listen(process.env.PORT, () => {
  console.log('Listening on port ' + process.env.PORT);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection 💥');
  console.error(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
