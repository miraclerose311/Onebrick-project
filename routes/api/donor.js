const express = require("express");
const router = express.Router();
const faker = require("faker");
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const Donor = require("../../models/Donor");
const User = require("../../models/User");

router.post("/initial", async (req, res) => {
	const users = await User.find();
	const count = 10000;
	const fakeDonors = [];
	console.log(users[0]);
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
		});
	}

	try {
		await Donor.insertMany(fakeDonors);
		console.log(`Successfully added ${count} fake donors.`);
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

	try {
		// if user exists
		let donor = await Donor.findOne({ email });
		if (donor) {
			return res
				.status(400)
				.json({ errors: [{ msg: "Donor already exists" }] });
		}

		// create donor
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
		// save user to database
		await newDonor.save().then((donor) => {
			// res.json(donor._id)
		});

		res.status(200).send("Successfully registerd");
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Server error");
	}
});

router.post("/get-donor", async (req, res) => {
	try {
		Donor.findOne({ user_id: req.body.userId }).then((response) => {
			res.json(response);
		});
	} catch {
		(e) => {
			console.logo(e);
		};
	}
});

module.exports = router;
