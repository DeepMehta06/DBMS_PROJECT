const mongoose = require('mongoose');

const registersSchema = new mongoose.Schema({
  Reco_Id: {
    type: Number,
    required: true,
    ref: 'Recording_Staff'
  },
  Bd_Id: {
    type: Number,
    required: true,
    ref: 'Blood_Donor'
  }
}, {
  timestamps: true
});

// Composite primary key
registersSchema.index({ Reco_Id: 1, Bd_Id: 1 }, { unique: true });

module.exports = mongoose.model('Registers', registersSchema);
