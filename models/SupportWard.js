const mongoose = require("mongoose");

const SupportWordSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("supportWord", SupportWordSchema);
