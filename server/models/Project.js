const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
  },
  projectName: {
    type: String,
    trim: true,
    required: true,
  },
  projectThumnail: {
    type: String,
    default: "",
  },
  startDate: { type: Date, default: Date.now() },
  dateline: { type: Date },
  budget: { type: Number },
  isDelete: { type: Boolean, default: false },
});

module.exports = mongoose.model("project", projectSchema);
