const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  { 
    membership_list: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "membership",
      required: true,
    }],
    product_list:[
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
      }
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("cart", cartSchema);