const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  userType: {
    type: String,
    enum: ["super-admin", "admin", "staff"],
    default: "super-admin",
  },
  hashed_password: {
    type: String,
  },
});

module.exports = mongoose.model("auth", authSchema);
