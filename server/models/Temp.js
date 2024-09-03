const mongoose = require("mongoose");

const tempSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  phoneOrEmail: {
    type: String,
  },
  accType: {
    type: String,
    default: "user",
  },
  otp: {
    type: String,
  },
});

module.exports = mongoose.model("temp", tempSchema);
