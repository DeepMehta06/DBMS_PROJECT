const mongoose = require('mongoose');

const bloodSpecimenSchema = new mongoose.Schema({
  specimenNumber: {
    type: String,
    required: [true, 'Please provide specimen number'],
    unique: true,
    trim: true,
  },
  bloodGroup: {
    type: String,
    required: [true, 'Please provide blood group'],
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  status: {
    type: String,
    required: [true, 'Please provide status'],
    enum: ['available', 'reserved', 'used', 'contaminated'],
    default: 'available',
  },
  collectionDate: {
    type: Date,
    required: [true, 'Please provide collection date'],
  },
  expiryDate: {
    type: Date,
    required: [true, 'Please provide expiry date'],
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor',
  },
}, {
  timestamps: true,
});

// Index for faster queries (specimenNumber already has unique index from schema)
bloodSpecimenSchema.index({ bloodGroup: 1 });
bloodSpecimenSchema.index({ status: 1 });

// Virtual to check if specimen is expired
bloodSpecimenSchema.virtual('isExpired').get(function() {
  return this.expiryDate < new Date();
});

// Pre-save hook to update status if expired
bloodSpecimenSchema.pre('save', function(next) {
  if (this.expiryDate < new Date() && this.status === 'available') {
    this.status = 'contaminated';
  }
  next();
});

module.exports = mongoose.model('BloodSpecimen', bloodSpecimenSchema);
