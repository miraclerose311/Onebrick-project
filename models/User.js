const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profile: {
     fullName: {
        type: String,
        required: true
      },
      mobile: {
        type: String
      },
      pan: {
        type: String
      },
      aadhaar: {
        type: String
      },
      address: {
        type: String
      },
      country: {
        type: String
      },
      state: {
        type: String
      },
      pin: {
        type: String
      }
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model('user', UserSchema);
