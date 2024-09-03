const mongoose = require("mongoose");

const taskContactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "client-contact",
    default: null,
  },
  isDelete: { type: Boolean, default: false },
});

module.exports = mongoose.model("task-contact", taskContactSchema);
