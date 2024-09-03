const mongoose = require("mongoose");

const RelationPosition = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    position: {
      type: String,
      trim: true,
      required: true,
    },

    isDelete: { type: Boolean, default: false },
    // isStatic: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("relation-positions", RelationPosition);
