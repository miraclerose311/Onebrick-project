const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

const googleOAuth = require("../../utils/googleOAuth");
const axios = require("axios");

// @route   GET api/auth
// @desc    Protected route (check if the user exists)
// @access  Public
router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// @route   POST api/auth/google-register
// @desc    Protected route (check if the user exists)
// @access  Public
router.post("/google-register", async (req, res) => {
  try {
    const { access_token } = req.body;
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
      }
    );
    const { email, family_name, given_name, picture } = response.data;
    const fullName = given_name + " " + family_name;

    let user = await User.findOne({ email });
    // If user doesn't exist
    if (user) {
      return res.status(400).json({ Error: "This user already exists" });
    }

    // Create user
    const newUser = new User({ fullName, email, picture });

    if (
      fullName === "Krishnesh Nair" ||
      fullName === "Benjamin Tan" ||
      fullName === "ShaoMin Lee"
    ) {
      newUser["role"] = 2;
    } else {
      newUser["role"] = 1;
    }

    // Save user to database
    await newUser.save();

    const payload = {
      id: newUser._id,
      email: newUser.email,
      fullName: newUser.fullName,
      role: newUser.role,
    };

    // Create jwt token and return it
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, picture });
      }
    );
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});

// @route   POST api/auth/google-login
// @desc    Protected route (check if the user exists)
// @access  Public
router.post("/google-login", async (req, res) => {
  try {
    const { access_token } = req.body;
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
      }
    );
    const { email, picture } = response.data;

    let user = await User.findOne({ email });

    // Check if there is a user this email
    if (!user) {
      return res.status(400).json({ Error: "This user does not exists" });
    }

    const payload = {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    };

    // Create jwt token and return it
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, picture });
      }
    );

    // const profile = await Profile.findOne({ id: user._id });
    // if (profile) {
    //   return res.status(200).json(user, profile);
    // }
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user + get token (login)
// @access  Public
router.post(
	"/login",
	[
		check("email", "Please include a valid email").isEmail(),
		check("otp", "OTP code is required").exists(),
	],
	async (req, res) => {
		//const errors = validationResult(req);
		//if errors
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });
			// if user doesn't exist
			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Invalid credentials" }] });
			}

			// if exist, we need to match the password
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Invalid credentials" }] });
			}

			// return webtoken from user
			const payload = {
				user: {
					id: user.id,
					// this Id comes from DataBase when user is created
				},
			};
			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{ expiresIn: "3 days" },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (error) {
			res.status(500).send("Server error");
		}
	}
);

// @route   POST api/auth/register
// @desc    Register user (register)
// @access  Public
router.post(
	"/register",
	[
		check("firstName", "First name is required").not().isEmpty(),
		check("lastName", "Last name is required").not().isEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check("mobile", "Mobile phone number is required").isNumeric(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		// if errors
		if (!errors.isEmpty()) {
			// 400 => bad request from the client
			return res.status(400).json({ errors: errors.array() });
		}

		const { firstName, lastName, email, mobile } = req.body;
		const fullName = firstName + " " + lastName;
		try {
			// if user exists
			let user = await User.findOne({ email });
			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "User already exists" }] });
			}

			// create user
			newUser = new User({ fullName, email, mobile });

			// save user to database
			await newUser.save();

			res.status(200).send("Successfully registerd");
		} catch (error) {
			res.status(500).send("Server error");
		}
	}
);

// @route   GET api/auth/me
// @desc    Get current user profile
// @access  Private
router.get("/me", auth, async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.user.id });

		if (!user) {
			return res.status(400).json({ msg: "There is no this user" });
		}

		res.json(user);
	} catch (error) {
		res.status(500).send("Server Error");
	}
});

module.exports = router;
