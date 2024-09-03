const mongoose = require("mongoose");

const resetPassSchema = new mongoose.Schema(
  {
    phoneOrEmail: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ResetPass", resetPassSchema);
