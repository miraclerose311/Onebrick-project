const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const auth = require('../../middleware/auth');

const Brick = require('../../models/Brick');
const Donor = require('../../models/Donor');
const User = require('../../models/User');

const initialData = require('./initialValue');

router.get('/test', (req, res) => {
  res.json('test!');
});

router.post('/initial', async (req, res) => {
  await Brick.insertMany(initialData).then((result) => res.json(result));
});

router.get('/sold-amount', async (req, res) => {
  await Brick.find({ sold: true })
    .count()
    .then((amount) => {
      res.json(amount);
    });
});

router.get('/all', async (req, res) => {
  await Brick.find()
    .populate('user')
    .then((result) => {
      res.json(result);
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
});

router.post('/order', async (req, res) => {
  const { amount } = req.body;

  const rzp = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: amount, // amount in the smallest currency unit
    currency: 'INR',
  };

  const order = await rzp.orders.create(options);

  if (!order) {
    return res.status(500).send('Some error ocurred');
  }

  res.json(order);

  // await Brick.updateOne(
  //   { brick_id },
  //   {
  //     $set: {
  //       user: user,
  //       amount: amount,
  //       sold: true,
  //     },
  //   }
  // );
  // await Brick.findOne({ brick_id })
  //   .populate('user')
  //   .then((result) => {
  //     res.json(result);
  //     console.log(result);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
});

router.post('/add-dedication', async (req, res) => {
  const { brick_id, name, relationship, message } = req.body;

  const newDedication = { name, relationship, message };
  try {
    // update brick by id
    Brick.updateOne({ brick_id }, { $set: { dedication: newDedication } })
      .then(() => res.status(200).send(req.body))
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
