const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    programName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    rank_name: {
      type: String,
    },
    day_to_ready: {
      type: String,
      // required: true
    },
    lession_to_ready: {
      type: String,
      // required: true
    },
    rank_order: {
      type: Number,
      required: true,
    },
    rank_image: {
      type: String,
    },
    userId: {
      type: String,
      index: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Program_rank", programSchema);
