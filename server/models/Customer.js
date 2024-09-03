const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
    required: true,
  },
  fullName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    zipCode: String,
    state: String,
    street: String,
    city: String,
    country: {
      type: String,
      required: true,
    },
  },
  contact: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("customer", customerSchema);
