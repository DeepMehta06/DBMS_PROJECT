const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide donor name'],
    trim: true,
  },
  bloodGroup: {
    type: String,
    required: [true, 'Please provide blood group'],
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  age: {
    type: Number,
    required: [true, 'Please provide age'],
    min: [18, 'Donor must be at least 18 years old'],
    max: [65, 'Donor must be at most 65 years old'],
  },
  sex: {
    type: String,
    required: [true, 'Please provide sex'],
    enum: ['Male', 'Female', 'Other'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'Please provide city'],
    trim: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Index for faster queries
donorSchema.index({ bloodGroup: 1 });
donorSchema.index({ city: 1 });

module.exports = mongoose.model('Donor', donorSchema);
