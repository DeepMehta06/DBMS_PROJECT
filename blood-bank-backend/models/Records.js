const mongoose = require('mongoose');

const recordsSchema = new mongoose.Schema({
  Reco_Id: {
    type: Number,
    required: true,
    ref: 'Recording_Staff'
  },
  Reci_Id: {
    type: Number,
    required: true,
    ref: 'Recipient'
  }
}, {
  timestamps: true
});

// Composite primary key
recordsSchema.index({ Reco_Id: 1, Reci_Id: 1 }, { unique: true });

module.exports = mongoose.model('Records', recordsSchema);
