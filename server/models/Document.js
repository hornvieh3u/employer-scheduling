const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cloudUrl: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["general", "contract"],
      required: true,
    },
    userId: {
      type: String,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("document", documentSchema);
