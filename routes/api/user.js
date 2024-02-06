const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");

const User = require("../../models/User");
const Profile = require("../../models/Profile");


router.post("/byId", async (req, res) => {
	try {
		const user = await User.findById(req.body.userId);
		res.status(200).json(user);
	} catch (err) {
		res.status(500).send(err.message);
	}
});
// @route    POST api/users/add
// @desc     Add user
// @access   Private
router.post(
	"/add",
	check("name", "Name is required").notEmpty(),
	check("email", "Please include a valid email").isEmail(),
	check(
		"password",
		"Please enter a password with 6 or more characters"
	).isLength({ min: 6 }),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "User already exists" }] });
			}

			user = new User({
				name,
				email,
				password,
			});


			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			// save profile to database
			const profile = await Profile({ user: user._id });
			await profile.save();

			res.json(user);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server error");
		}
	}
);

// router.post('/isProfiled', async(req, res) => {
//   const count = await User.findById({_id: req.body.user_id}).then(result => {
//     res.json(result)
//   })
// })

router.post("/add-profile", async (req, res) => {
	const profileData = ({
		fullName,
		mobile,
		pan,
		aadhaar,
		address,
		country,
		resion,
		pin,
	} = req.body);
	try {
		await User.findByIdAndUpdate(
			{ _id: new mongoose.Types.ObjectId(req.body.user_id) },
			{ $set: { profile: profileData } },
			{ upsert: true }
		);
	} catch (e) {
		console.log(e);
	}
});

router.get("/", auth, async (req, res) => {
	try {
		const users = await User.find({ type: 1 }).select("name email");
		res.json(users);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    DELETE api/users/delete/:user_id
// @desc     Delete profile, user & posts
// @access   Private
router.delete(
	"/delete/:user_id",
	auth,
	async ({ params: { user_id } }, res) => {
		try {
			// Remove user posts
			// Remove profile
			// Remove user
			await Promise.all([
				Profile.findOneAndRemove({ user: user_id }),
				User.findOneAndRemove({ _id: user_id }),
			]);

			res.json({ msg: "User deleted" });
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

module.exports = router;
