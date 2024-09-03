const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema;

const managestripeSchema = new mongoose.Schema(
  {
    candidate: {
      type: String,
      required: true
    },
    stripe_name: {
      type: String,
      required: true
    },
    stripe_order: {
      type: String,
      required: true
    },
    stripe_image: {
      type: String
    },
    userId: {
      type: String,
      index: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("candidate_stripes", managestripeSchema);
