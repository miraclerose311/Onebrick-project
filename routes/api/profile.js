const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route    GET api/profile/
// @desc     Get current users profile
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'email', 'type']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
  auth,
  check('address', 'Address is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    let beforeAddress;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { address } = req.body;
    const profile = await Profile.findOne({ user: req.user.id });
    if (profile?.address) {
      beforeAddress = profile.address;
      if (!beforeAddress.includes(address)) beforeAddress.push(address);
    } else {
      beforeAddress = [];
      beforeAddress.push(address);
    }

    const profileFields = {
      user: req.user.id,
      address: beforeAddress,
    };
    try {
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(profile);
    } catch (e) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
