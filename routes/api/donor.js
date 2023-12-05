const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const Donor = require('../../models/Donor');

router.post('/insert', async (req, res) => {
  const { user_id, fullName, email, mobile, pan, aadhaar, address, country, state, pin } = req.body;

  try {
    // if user exists
    let donor = await Donor.findOne({ email });
    if (donor) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Donor already exists' }] });
    }

    // create donor
    newDonor = new Donor({ user_id, fullName, email, mobile, pan, aadhaar, address, country, state, pin });
    // save user to database
    await newDonor.save().then(donor => {
      // res.json(donor._id)
    })

    res.status(200).send('Successfully registerd');
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;

