const mongoose = require("mongoose");

const BrickSchema = new mongoose.Schema({
	brick_id: {
		type: String,
		required: true,
		unique: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	amount: {
		type: Number,
	},
	date: {
		type: Date,
		// required: true,
	},
	location: {
		type: String,
	},
	dedication: {
		name: {
			type: String,
		},
		relationship: {
			type: String,
		},
		message: {
			type: String,
		},
		image: {
			imageName: { type: String },
			imagePath: { type: String },
		},
	},
	sold: {
		type: Boolean,
		default: false,
	},
	fake: {
		type: Boolean,
		default: false,
	},
});

BrickSchema.index({ "$**": "text" });

module.exports = mongoose.model("bricks", BrickSchema);
