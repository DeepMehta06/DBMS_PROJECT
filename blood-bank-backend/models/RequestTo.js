const mongoose = require('mongoose');

const requestToSchema = new mongoose.Schema({
  Reci_Id: {
    type: Number,
    required: true,
    ref: 'Recipient'
  },
  M_Id: {
    type: Number,
    required: true,
    ref: 'BB_Manager'
  }
}, {
  timestamps: true
});

// Composite primary key
requestToSchema.index({ Reci_Id: 1, M_Id: 1 }, { unique: true });

module.exports = mongoose.model('Request_To', requestToSchema);
