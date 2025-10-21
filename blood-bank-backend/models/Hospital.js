const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide hospital name'],
    trim: true,
    unique: true,
  },
  city: {
    type: String,
    required: [true, 'Please provide city'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  type: {
    type: String,
    enum: ['general', 'specialized', 'emergency'],
    default: 'general',
  },
  capacity: {
    type: Number,
    min: [0, 'Capacity cannot be negative'],
  },
}, {
  timestamps: true,
});

// Index for faster queries
hospitalSchema.index({ city: 1 });

module.exports = mongoose.model('Hospital', hospitalSchema);
