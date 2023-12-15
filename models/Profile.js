const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  mobile: {
    type: String,
    required: true,
  },
  pan: {
    type: String,
  },
  aadhaar: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('profile', ProfileSchema);
