const express = require("express");
const router = express.Router();
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

router.get("/sold_amount", async (req, res) => {
	await Brick.find({ sold: true })
		.count()
		.then((amount) => {
			res.json(amount);
		});
});

router.get("/all", async (req, res) => {
	await Brick.find()
		.populate("user")
		.then((result) => {
			res.json(result);
		})
		.catch(function (error) {
			console.log(error); // Failure
		});
});

router.post("/buy", async (req, res) => {
	const { brick_id, user, amount } = req.body;
	await Brick.updateOne(
		{ brick_id: brick_id },
		{
			$set: {
				user: user,
				amount: amount,
				sold: true,
			},
		}
	);
	await Brick.findOne({ brick_id: brick_id })
		.populate("user")
		.then((result) => {
			res.json(result);
			console.log(result);
		})
		.catch(function (error) {
			console.log(error); // Failure
		});
});

router.post("/dedication_insert", async (req, res) => {
	// console.log("body", req.body);
	const { brick_id, name, relationship, message } = req.body;

	const newDedication = { name, relationship, message };
	try {
		// update brick by id
		Brick.updateOne(
			{ brick_id: brick_id },
			{ $set: { dedication: newDedication } }
		)
			.then((result) => res.json(result))
			.catch((e) => console.log(e));
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Server error");
	}
});

module.exports = router;
