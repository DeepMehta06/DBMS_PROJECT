const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  Bd_Id: {
    type: Number,
    required: true,
    unique: true
  },
  Bd_Name: {
    type: String,
    required: [true, 'Please provide donor name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  Bd_Age: {
    type: Number,
    required: [true, 'Please provide age'],
    min: [18, 'Donor must be at least 18 years old'],
    max: [65, 'Donor must be at most 65 years old']
  },
  Bd_Sex: {
    type: String,
    required: [true, 'Please provide sex'],
    enum: ['M', 'F'],
    maxlength: 1
  },
  Bd_Phone: {
    type: String,
    required: [true, 'Please provide phone number'],
    trim: true,
    maxlength: [15, 'Phone number cannot exceed 15 characters']
  },
  Bd_Bgroup: {
    type: String,
    required: [true, 'Please provide blood group'],
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    maxlength: 3
  },
  Bd_reg_Date: {
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
donorSchema.index({ Bd_Bgroup: 1 });
donorSchema.index({ City_Id: 1 });

module.exports = mongoose.model('Blood_Donor', donorSchema);
