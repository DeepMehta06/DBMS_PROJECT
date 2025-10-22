const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
  Reci_Id: {
    type: Number,
    required: true,
    unique: true
  },
  Reci_Name: {
    type: String,
    required: [true, 'Please provide recipient name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  Reci_Age: {
    type: Number,
    required: [true, 'Please provide age'],
    min: [0, 'Age cannot be negative']
  },
  Reci_Sex: {
    type: String,
    required: [true, 'Please provide sex'],
    enum: ['M', 'F'],
    maxlength: 1
  },
  Reci_Phone: {
    type: String,
    required: [true, 'Please provide phone number'],
    trim: true,
    maxlength: [15, 'Phone number cannot exceed 15 characters']
  },
  Reci_Bgrp: {
    type: String,
    required: [true, 'Please provide blood group'],
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    maxlength: 3
  },
  Reci_Bqty: {
    type: Number,
    required: [true, 'Please provide blood quantity needed'],
    min: [1, 'Blood quantity must be at least 1 unit']
  },
  Reci_Date: {
    type: Date,
    default: Date.now
  },
  City_Id: {
    type: Number,
    required: [true, 'Please provide city'],
    ref: 'City'
  }
}, {
  timestamps: true
});

// Index for faster queries
recipientSchema.index({ Reci_Bgrp: 1 });
recipientSchema.index({ City_Id: 1 });

module.exports = mongoose.model('Recipient', recipientSchema);
