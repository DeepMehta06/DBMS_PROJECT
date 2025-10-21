const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide recipient name'],
    trim: true,
  },
  bloodGroup: {
    type: String,
    required: [true, 'Please provide blood group'],
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  bloodQuantity: {
    type: Number,
    required: [true, 'Please provide blood quantity needed'],
    min: [1, 'Blood quantity must be at least 1 unit'],
  },
  age: {
    type: Number,
    required: [true, 'Please provide age'],
    min: [0, 'Age cannot be negative'],
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
  requestDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'fulfilled', 'rejected'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

// Index for faster queries
recipientSchema.index({ bloodGroup: 1 });
recipientSchema.index({ status: 1 });

module.exports = mongoose.model('Recipient', recipientSchema);
