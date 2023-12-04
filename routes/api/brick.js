const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Brick = require('../../models/Brick');
const User = require('../../models/User');

const initialBricks = require('./initialValue')

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
  await Brick.insertMany(initialBricks);
});

router.post('/buy', async (req, res) => {
  console.log(req.body.brick_id)
  await Brick.updateOne({ brick_id: req.body.brick_id }, { $set: { sold: true } })
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
router.get('/test', (req, res) => {
  res.json("test!")
})

module.exports = router;
