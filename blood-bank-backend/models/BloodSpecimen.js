const mongoose = require('mongoose');

const bloodSpecimenSchema = new mongoose.Schema({
  Specimen_Id: {
    type: Number,
    required: true,
    unique: true
  },
  B_Group: {
    type: String,
    required: [true, 'Please provide blood group'],
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    maxlength: 3
  },
  Status: {
    type: String,
    required: [true, 'Please provide status'],
    maxlength: [50, 'Status cannot exceed 50 characters'],
    default: 'available'
  }
}, {
  timestamps: true
});

// Index for faster queries
bloodSpecimenSchema.index({ B_Group: 1 });
bloodSpecimenSchema.index({ Status: 1 });

module.exports = mongoose.model('Blood_Specimen', bloodSpecimenSchema);
