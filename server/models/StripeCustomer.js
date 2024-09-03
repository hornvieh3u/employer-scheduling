const mongoose = require("mongoose");

const stripeCustomerSchema = new mongoose.Schema(
  {
    customerId: {
      type: String
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'auth',
    },
    name: {
      type: String
    },
    email: {
      type: String
    },
    phone: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("stripe-customer", stripeCustomerSchema);
