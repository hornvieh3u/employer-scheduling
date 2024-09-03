const mongoose = require("mongoose");

const userTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 604800,
  },
});

module.exports = mongoose.model("auusertokenth", userTokenSchema);
