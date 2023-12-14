const mongoose = require('mongoose');

const PaymentDetailsSchema = mongoose.Schema({
  razorpayDetails: {
    orderId: String,
    paymentId: String,
    signature: String,
  },
  success: Boolean,
});

module.exports = mongoose.model('PaymentDetail', PaymentDetailsSchema);
