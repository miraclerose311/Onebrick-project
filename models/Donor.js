const mongoose = require("mongoose");

const DonorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
  pan: {
    type: String,
  },
  aadhaar: {
    type: String,
  },
  address: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  pin: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

DonorSchema.index({ "$**": "text" });

module.exports = mongoose.model("donor", DonorSchema);
