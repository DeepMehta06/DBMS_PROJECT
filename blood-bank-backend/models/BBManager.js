const mongoose = require('mongoose');

const bbManagerSchema = new mongoose.Schema({
  M_Id: {
    type: Number,
    required: true,
    unique: true
  },
  M_Name: {
    type: String,
    required: [true, 'Manager name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  M_Phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    maxlength: [15, 'Phone number cannot exceed 15 characters']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BB_Manager', bbManagerSchema);
