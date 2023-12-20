// const express = require('express');
// const router = express.Router();
// const Razorpay = require('razorpay');
// const crypto = require('crypto');

// const PaymentDetails = require('../../models/Payment');

// router.post('/order', async (req, res) => {
//   const { amount } = req.body;

//   const rzp = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
//   });

//   const options = {
//     amount: amount, // amount in the smallest currency unit
//     currency: 'INR',
//   };

//   const order = await rzp.orders.create(options);

//   if (!order) {
//     return res.status(500).send('Some error ocurred');
//   }

//   return res.json(order);
// });

// router.post('/success', async (req, res) => {
//   try {
//     const {
//       orderCreationId,
//       razorpayPaymentId,
//       razorpayOrderId,
//       razorpaySignature,
//     } = req.body;

//     const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
//     shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
//     const digest = shasum.digest('hex');

//     if (digest !== razorpaySignature)
//       return res.status(400).json({ msg: 'Transaction not legit!' });

//     const newPayment = PaymentDetails({
//       razorpayDetails: {
//         orderId: razorpayOrderId,
//         paymentId: razorpayPaymentId,
//         signature: razorpaySignature,
//       },
//       success: true,
//     });

//     await newPayment.save();

//     res.json({
//       msg: 'Payment success',
//       orderId: razorpayOrderId,
//       paymentId: razorpayPaymentId,
//     });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// module.exports = router;
