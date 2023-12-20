const express = require("express");
const router = express.Router();
const multer = require("multer");
<<<<<<< HEAD
=======
// const { faker } = require("@faker-js/faker");
>>>>>>> e209f749789ad245f02d8b629f185af0b8bc126f
const faker = require("faker");
const auth = require("../../middleware/auth");

const Brick = require("../../models/Brick");
const Donor = require("../../models/Donor");
const User = require("../../models/User");

const bricksID = require("./initialValue.js");
router.get("/test", (req, res) => {
	res.json("test!");
});

router.post("/initial", async (req, res) => {
	// await Brick.insertMany(initialData).then((result) => res.json(result));
	const fakeBricks = [];
	const count = 35000;
	const users = await User.find();
	let j = 0;
	for (let i = 0; i < count; i++) {
		if (Math.random() > 0.85) {
			fakeBricks.push({
				user: users[j]._id,
				brick_id: bricksID[i],
				amount: faker.finance.amount(),
				date: faker.date.past(1),
				dedication: {
					name: faker.name.findName(),
					relationship: faker.lorem.word(),
					message: faker.lorem.sentence(),
					image: {
						imageName: faker.system.fileName(),
						imagePath: faker.image.imageUrl(),
					},
				},
				sold: true,
				fake: true,
			});
			j++;
		} else {
			fakeBricks.push({
				brick_id: bricksID[i],
				sold: false,
			});
		}
	}
	try {
		await Brick.insertMany(fakeBricks);
		console.log(`Successfully added ${count} fake bricks.`);
	} catch (error) {
		console.error("Error inserting fake data:", error);
	}
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

router.get("/current_page", async (req, res) => {
	try {
		let { brick_id, date, page, limit, sold, fake } = req.query;
		let filter_query = {};
		let sort_query = {};

		brick_id = parseInt(brick_id);
		date = parseInt(date);

		if (sold !== "all") filter_query.sold = sold === "true";
		if (fake !== "all") filter_query.fake = fake === "true";

		if (brick_id !== 0) sort_query.brick_id = brick_id;
		if (date !== 0) sort_query.date = date;

		// Parse 'page' and 'limit' as integers
		page = parseInt(page, 10) || 1;
		limit = parseInt(limit, 10) || 10;

		// Define the pipeline to get the total count
		const countPipeline = [
			...(Object.keys(filter_query).length ? [{ $match: filter_query }] : []),
			{ $group: { _id: null, total: { $sum: 1 } } },
			{ $project: { _id: 0, total: 1 } },
		];

		// Execute the count pipeline to get the total number of documents
		const totalCountResult = await Brick.aggregate(countPipeline).exec();
		const totalDocuments =
			totalCountResult.length > 0
				? Math.ceil(totalCountResult[0].total / limit)
				: 0;
		console.log(sort_query);
		// Now define the pipeline to fetch the documents
		const dataPipeline = [
			...(Object.keys(filter_query).length ? [{ $match: filter_query }] : []),
			...(Object.keys(sort_query).length ? [{ $sort: sort_query }] : []),
			{ $skip: (page - 1) * limit },
			{ $limit: limit },
			{
				$lookup: {
					from: "donors",
					localField: "user",
					foreignField: "user",
					as: "donor",
				},
			},
		];

		// Fetch the documents based on the query and pagination options
		const documents = await Brick.aggregate(dataPipeline).exec();
		// Send back the total count along with the documents
		res.json({
			totalDocuments,
			documents,
			page,
			limit,
		});
	} catch (err) {
		console.error(err);
		res.status(500).send("Server Error");
	}
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
