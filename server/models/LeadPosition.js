const mongoose = require("mongoose");

const LeadPosition = new mongoose.Schema(
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
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("lead-position", LeadPosition);
