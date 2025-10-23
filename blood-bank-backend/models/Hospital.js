const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  // SQL Schema fields (Primary)
  Hosp_Id: {
    type: Number,
    sparse: true,
  },
  Hosp_Name: {
    type: String,
    trim: true,
    maxlength: [100, 'Hospital name cannot exceed 100 characters']
  },
  Hosp_Phone: {
    type: String,
    trim: true,
    maxlength: [15, 'Phone number cannot exceed 15 characters']
  },
  Hosp_Needed_Bgrp: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Multiple'],
    maxlength: 10
  },
  City_Id: {
    type: Number,
    ref: 'City'
  },
  
  // Old fields for backward compatibility
  name: {
    type: String,
    trim: true,
    unique: true,
  },
  city: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
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

// Pre-save hook to sync fields
hospitalSchema.pre('save', function(next) {
  // Sync new to old
  if (this.Hosp_Name) this.name = this.Hosp_Name;
  if (this.Hosp_Phone) this.phone = this.Hosp_Phone;
  
  // Sync old to new
  if (this.name && !this.Hosp_Name) this.Hosp_Name = this.name;
  if (this.phone && !this.Hosp_Phone) this.Hosp_Phone = this.phone;
  
  next();
});

// Index for faster queries
hospitalSchema.index({ Hosp_Needed_Bgrp: 1 });
hospitalSchema.index({ City_Id: 1 });
hospitalSchema.index({ city: 1 });

module.exports = mongoose.model('Hospital', hospitalSchema);
