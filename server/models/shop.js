const mongoose = require("mongoose");

const schema = mongoose.Schema;
const shopSchema = new mongoose.Schema(
  {
    shopCategory: {
      type: String,
      enum: ["product", "membership"],
      default: "",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    products: [
      {
        type: schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    memberships: [
      {
        type: schema.Types.ObjectId,
        ref: "membership",
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("shops", shopSchema);
