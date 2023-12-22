const express = require("express");
const router = express.Router();
const faker = require("faker");
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const Donor = require("../../models/Donor");
const User = require("../../models/User");

router.post("/initial", async (req, res) => {
	try {
		const count = req.body.count;
		const fakeDonors = [];

		await Donor.deleteMany({});

		const users = await User.find();

		for (let i = 0; i < count; i++) {
			fakeDonors.push({
				user: users[i]._id,
				fullName: faker.name.findName(),
				email: faker.internet.email(),
				mobile: faker.phone.phoneNumber(),
				pan: faker.finance.account(10), // A PAN number typically has 10 characters
				aadhaar: faker.finance.account(12), // An Aadhaar number typically has 12 digits
				address: faker.address.streetAddress(),
				country: faker.address.country(),
				state: faker.address.state(),
				pin: faker.datatype
					.number({ min: 0, max: 9999 })
					.toString()
					.padStart(4, "0"), // This gives a ZIP code but could be used as a PIN code
				fake: true,
			});
		}

		await Donor.insertMany(fakeDonors);
		res.send(`Successfully added ${count} fake donors.`);
	} catch (error) {
		console.error("Error inserting fake data:", error);
	}
});

router.post("/insert", async (req, res) => {
	const {
		userId,
		fullName,
		email,
		mobile,
		pan,
		aadhaar,
		address,
		country,
		state,
		pin,
	} = req.body;

	newDonor = new Donor({
		user_id: userId,
		fullName,
		email,
		mobile,
		pan,
		aadhaar,
		address,
		country,
		state,
		pin,
	});
	try {
		await Donor.updateOne(
			{ user: userId },
			{
				$set: newDonor,
			},
			{ upsert: true, new: true }
		)
			.then((result) => console.log(result))
			.catch((e) => res.status(400).json(e));
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Server error");
	}
});

router.get("/donorcount", async (req, res) => {
	try {
		const donor = await Donor.find().count();
		const fakedonor = await Donor.find({ fake: true }).count();
		res.json({ donor, fakedonor });
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Server error");
	}
});

router.post("/get-donor", async (req, res) => {
	try {
		Donor.findOne({ user: req.body.userId }).then((response) => {
			res.json(response);
			console.log(response);
		});
	} catch {
		(e) => {
			console.logo(e);
		};
	}
});

router.get("/current_page", async (req, res) => {
	try {
		let { page, limit, term, mobile, country, state, address, pin, pan } =
			req.query;
		let sort_query = {};
		let filter_query = {};

		// Add text search to filter_query if term is provided
		if (term && term !== "") {
			filter_query.$expr = {
				$or: [
					{ $regexMatch: { input: "$fullName", regex: term, options: "i" } },
					{ $regexMatch: { input: "$email", regex: term, options: "i" } },
					{ $regexMatch: { input: "$pin", regex: term, options: "i" } },
					{ $regexMatch: { input: "$pan", regex: term, options: "i" } },
					{ $regexMatch: { input: "$address", regex: term, options: "i" } },
					{ $regexMatch: { input: "$country", regex: term, options: "i" } },
					{ $regexMatch: { input: "$state", regex: term, options: "i" } },
				],
			};
		}

		if (mobile != 0) sort_query.mobile = parseInt(mobile);
		if (country != 0) sort_query.country = parseInt(country);
		if (state != 0) sort_query.state = parseInt(state);
		if (address != 0) sort_query.address = parseInt(address);
		if (pin != 0) sort_query.pin = parseInt(pin);
		if (pan != 0) sort_query.pan = parseInt(pan);

		// Parse 'page' and 'limit' as integers
		page = parseInt(page, 10) || 1;
		limit = parseInt(limit, 10) || 10;

		// Define the pipeline to get the total count
		const countPipeline = [
			{ $group: { _id: null, total: { $sum: 1 } } },
			{ $project: { _id: 0, total: 1 } },
		];

		// Execute the count pipeline to get the total number of documents
		const totalCountResult = await Donor.aggregate(countPipeline).exec();
		const totalDocuments =
			totalCountResult.length > 0
				? Math.ceil(totalCountResult[0].total / limit)
				: 0;
		// Now define the pipeline to fetch the documents
		const dataPipeline = [
			...(Object.keys(filter_query).length ? [{ $match: filter_query }] : []),
			...(Object.keys(sort_query).length ? [{ $sort: sort_query }] : []),
			{ $skip: (page - 1) * limit },
			{ $limit: limit },
		];

		// Fetch the documents based on the query and pagination options
		const documents = await Donor.aggregate(dataPipeline).exec();
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

module.exports = router;
