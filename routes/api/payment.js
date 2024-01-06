const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

const PaymentDetails = require("../../models/Payment");

router.post("/order", async (req, res) => {
  const { amount } = req.body;

  // Create Razorpay instance with credentials from environment variables
  const rzp = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  // Prepare the options for the new order
  const options = {
    amount: amount, // Amount in the smallest currency unit (e.g., paise for INR)
    currency: "INR",
  };

  try {
    // Create a new order using the Razorpay SDK
    const order = await rzp.orders.create(options);

    // Return the created order as JSON
    return res.json(order);
  } catch (error) {
    console.error(error);

    // Handle any errors that might occur during the creation of the order
    return res.status(500).send("Some error occurred");
  }
});

router.post("/success", async (req, res) => {
	try {
		const {
			orderCreationId,
			razorpayPaymentId,
			razorpayOrderId,
			razorpaySignature,
		} = req.body;

		const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
		shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
		const digest = shasum.digest("hex");

		if (digest !== razorpaySignature)
			return res.status(400).json({ msg: "Transaction not legit!" });

		const newPayment = PaymentDetails({
			razorpayDetails: {
				orderId: razorpayOrderId,
				paymentId: razorpayPaymentId,
				signature: razorpaySignature,
			},
			success: true,
		});

		await newPayment.save();

		res.json({
			msg: "Payment success",
			orderId: razorpayOrderId,
			paymentId: razorpayPaymentId,
		});
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
