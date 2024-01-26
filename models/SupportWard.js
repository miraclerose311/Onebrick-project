const mongoose = require("mongoose");

const SupportWordSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("supportWord", SupportWordSchema);
