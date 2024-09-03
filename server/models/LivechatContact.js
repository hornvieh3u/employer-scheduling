const mongoose = require("mongoose");

const LivechatContactSchema = mongoose.Schema({
  adminId: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("LivechatContact", LivechatContactSchema);
