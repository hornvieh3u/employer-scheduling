const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Types.ObjectId,
      ref: "tasks",
    },
    title: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    proofType: {
      type: String,
      enum: [
        "check",
        "yesNo",
        "input",
        "photo",
        "qrCode",
        "barCode",
        "measurement",
        "ratingToFive",
        "ratingToTen",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("checklists", taskSchema);
