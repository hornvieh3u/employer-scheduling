const mongoose = require("mongoose");
const { Schema } = mongoose;

const boardSchema = Schema(
  {
    id: String,
    title: String,
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Board", boardSchema);
