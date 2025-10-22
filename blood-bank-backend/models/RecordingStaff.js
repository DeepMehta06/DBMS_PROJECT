const mongoose = require('mongoose');

const recordingStaffSchema = new mongoose.Schema({
  Reco_Id: {
    type: Number,
    required: true,
    unique: true
  },
  Reco_Name: {
    type: String,
    required: [true, 'Staff name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  Reco_Phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    maxlength: [15, 'Phone number cannot exceed 15 characters']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Recording_Staff', recordingStaffSchema);
