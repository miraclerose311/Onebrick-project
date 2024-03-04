const mongoose = require("mongoose");

const SocialMediaSchema = new mongoose.Schema({
	mediaType: {
		type: String,
		required: true,
	},
	content: {
		type: String,
	},
    image: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("social_media", SocialMediaSchema);
