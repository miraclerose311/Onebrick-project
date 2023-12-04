const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Brick = require('../../models/Brick');
const Donor = require('../../models/Donor')
const User = require('../../models/User');

const initialData = require('./initialValue');
const { set } = require('mongoose');

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.get('/all', async (req, res) => {
  await Brick.find().then(result => {
    res.json(result)
  }).catch(function (error) {
    console.log(error)      // Failure 
  });
});

router.post('/initial', async (req, res) => {
  await Brick.insertMany(initialData);
});

router.post('/buy', async (req, res) => {
  const {brick_id, user, amount} = req.body
  const donor = await Donor.findOne({user_id: user})
  await Brick.updateOne(
    { brick_id: brick_id }, 
    { 
      $set: {
        donor_id: donor._id,
        amount: amount,
        sold: true 
      } 
    }
  )
    .then(result => {
      res.json(result)
    }).catch(function (error) {
      console.log(error)      // Failure 
    })
});

router.get('/sold_amount', async (req, res) => {
  await Brick.find({ sold: true }).count().then(amount => {
    res.json(amount)
  })
});

router.get('/alla', async (req, res) => {
  await Brick.aggregate([
    {
      $project: {
        "_id": 0,
        "brick_id": 1,
        "sold": 1,
      }
    }
  ]).then((result) => res.json(result))
    .catch(e => console.log(e))
})

router.post('/dedication_insert', async (req, res) => {
  const { brick_id, name, relationship, message } = req.body;

  const newDedication = {name, relationship, message }
  try {
    // update brick by id
    Brick.updateOne({brick_id: brick_id}, {$set: {dedication: newDedication}})
    .then(result => res.json(result))
    .catch(e => console.log(e))
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

router.get('/test', (req, res) => {
  res.json("test!")
})

module.exports = router;
