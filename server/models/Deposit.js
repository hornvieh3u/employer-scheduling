const mongoose = require("mongoose");

const depositSchema = new mongoose.Schema({
  user_id: {
    type: String,
    trim: true,
  },
  customer_id: {
    type: String,
    trim: true,
  },
  sub_id: {
    type: String,
    trim: true,
  },
  wallet: {
    type: Number,
    trim: true,
  },
  cretits: {
    type: Number,
    default: 0,
  },
  is_Already_Purchase: {
    type: Boolean,
    default: false,
  },
  purchased_Num: {
    type: String,
    default: null,
  },
  purchased_NumSid: {
    type: String,
    default: null,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
  },
});

module.exports = mongoose.model("deposit", depositSchema);
