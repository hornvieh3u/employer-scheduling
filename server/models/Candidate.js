const mongoose = require("mongoose");

const { Schema } = mongoose;
const stripeSchema = new Schema(
  {
    candidate: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      maxlength: 32,
    },
    color: {
      type: String,
      required: true,
    },
    lable: {
      type: String,
      required: true,
    },
    total_stripe: {
      type: String,
      required: true,
    },
    progression: {
      type: String,
      required: true,
    },
    candidate_image: {
      type: String,
    },
    stripes: [
      {
        type: Schema.Types.ObjectId,
        ref: "candidate_stripes",
      },
    ],
    userId: {
      type: String,
      index: true,
    },
    status: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("candidate", stripeSchema);
