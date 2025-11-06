require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const passport = require('./config/passport');

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://bbmanagement.netlify.app' // Netlify Frontend URL
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/donors', require('./routes/donor.routes'));
app.use('/api/recipients', require('./routes/recipient.routes'));
app.use('/api/blood-specimens', require('./routes/bloodSpecimen.routes'));
app.use('/api/hospitals', require('./routes/hospital.routes'));
// New routes for managers, recording staff, relationships and cities
app.use('/api/cities', require('./routes/city.routes'));
app.use('/api/managers', require('./routes/bbManager.routes'));
app.use('/api/recording-staff', require('./routes/recordingStaff.routes'));
app.use('/api/relationships', require('./routes/relationship.routes'));
// Hospital portal routes
app.use('/api/hospital/auth', require('./routes/hospitalAuth.routes'));
app.use('/api/chat', require('./routes/chat.routes'));
app.use('/api/requests', require('./routes/bloodRequest.routes'));

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Blood Bank Management System API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      auth: '/api/auth',
      donors: '/api/donors',
      recipients: '/api/recipients',
      bloodSpecimens: '/api/blood-specimens',
      hospitals: '/api/hospitals',
    },
  });
});

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
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
const HOST = process.env.HOST || '0.0.0.0'; // Bind to 0.0.0.0 for Render

const server = app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on ${HOST}:${PORT}`);
  console.log(`📍 CORS enabled for: ${corsOptions.origin.join(', ')}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`❌ Error: ${err.message}`);
  // Close server & exit process
  if (server && typeof server.close === 'function') {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});
