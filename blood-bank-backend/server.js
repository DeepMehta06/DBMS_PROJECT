require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const passport = require('./config/passport');

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/donors', require('./routes/donor.routes'));
app.use('/api/recipients', require('./routes/recipient.routes'));
app.use('/api/blood-specimens', require('./routes/bloodSpecimen.routes'));
app.use('/api/hospitals', require('./routes/hospital.routes'));

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Blood Bank Management System API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      donors: '/api/donors',
      recipients: '/api/recipients',
      bloodSpecimens: '/api/blood-specimens',
      hospitals: '/api/hospitals',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`❌ Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
