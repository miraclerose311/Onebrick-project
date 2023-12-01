const mongoose = require('mongoose');

const BrickSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    default: 1,
  },
  location: {
    type: String,
    required: true
  },
  donor: {
    mobile: String,
    PAN: String,
    aadhaar_id: String,
    address: String,
    country: String,
    state: String,
    PIN: String
  },
  dedication: {
    name: String,
    relationship: String,
    message: String,
    image: Buffer
  }
});

module.exports = mongoose.model('brick', BrickSchema);
