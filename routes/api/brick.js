const express = require("express");
const router = express.Router();
const multer = require("multer");
const Razorpay = require("razorpay");
const auth = require("../../middleware/auth");

const Brick = require("../../models/Brick");
const Donor = require("../../models/Donor");
const User = require("../../models/User");

const initialData = require("./initialValue");
router.get("/test", (req, res) => {
	res.json("test!");
});

router.post("/initial", async (req, res) => {
	await Brick.insertMany(initialData).then((result) => res.json(result));
});

router.get("/sold-amount", async (req, res) => {
	await Brick.find({ sold: true })
		.count()
		.then((amount) => {
			res.json(amount);
		});
});

router.get("/all", async (req, res) => {
	await Brick.find()
		.then((result) => {
			res.json(result);
		})
		.catch(function (error) {
			console.log(error); // Failure
		});
});

router.post("/buy", async (req, res) => {
	const { brick_id, user, amount, dedication } = req.body;
	await Brick.updateOne(
		{ brick_id },
		{
			$set: {
				user,
				amount,
				sold: true,
				dedication,
			},
		}
	)
		.then(() => res.json(req.body))
		.catch((e) => res.status(400).json(e));
});

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/"); // The folder where the uploaded files will be stored
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

const upload = multer({ storage: storage });

// Express route handler for adding a new Brick with a dedication

router.post("/add-dedication", upload.single("image"), async (req, res) => {
	console.log("backend file information => ", req.file.filename, req.file.path);

	if (!req.file) {
		// Check if the image file was received
		return res.status(400).send("No image file uploaded.");
	}

	// Deconstruct fields from the body
	const { brick_id, name, relationship, message } = req.body;

	// Create the dedication object including image information
	const dedication = {
		name,
		relationship,
		message,
		image: {
			imageName: req.file.filename, // filename set by multer's disk storage configuration
			imagePath: req.file.path, // path where multer saved the file
		},
	};

	try {
		// update brick by id
		Brick.updateOne({ brick_id }, { $set: { dedication: dedication } })
			.then(() => res.status(200).send(req.body))
			.catch((e) => console.log(e));
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Server error");
	}
});

module.exports = router;
