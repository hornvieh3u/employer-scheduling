const mongoose = require("mongoose");
var schema = mongoose.Schema;
var workHistorySchema = new schema(
  {
    userId: {
      type: String,
      index: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
    },
    description: {
      type: String,
    },
    screenshots: [
      {
        trackTime: Date,
        screenshot: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("workHistory", workHistorySchema);
