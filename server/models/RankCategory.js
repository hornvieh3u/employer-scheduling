const mongoose = require("mongoose");

const { Schema } = mongoose;
const rankCategory = new Schema(
  {
    rankName: {
      type: String,
      require: true,
    },
    rankOrder: {
      type: Number,
      require: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
    },
    Color: {
      type: String,
    },
    rankImage: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("rankCategory", rankCategory);
