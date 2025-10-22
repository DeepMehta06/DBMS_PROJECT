const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  Hosp_Id: {
    type: Number,
    required: true,
    unique: true
  },
  Hosp_Name: {
    type: String,
    required: [true, 'Please provide hospital name'],
    trim: true,
    maxlength: [100, 'Hospital name cannot exceed 100 characters']
  },
  Hosp_Phone: {
    type: String,
    required: [true, 'Please provide phone number'],
    trim: true,
    maxlength: [15, 'Phone number cannot exceed 15 characters']
  },
  Hosp_Needed_Bgrp: {
    type: String,
    required: [true, 'Please provide needed blood group'],
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    maxlength: 3
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
hospitalSchema.index({ City_Id: 1 });
hospitalSchema.index({ Hosp_Needed_Bgrp: 1 });

module.exports = mongoose.model('Hospital_Info', hospitalSchema);
