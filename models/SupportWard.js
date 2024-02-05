const mongoose = require("mongoose");

const SupportWordSchema = new mongoose.Schema({
	message: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("supportWord", SupportWordSchema);
