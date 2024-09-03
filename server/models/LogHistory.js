const mongoose = require("mongoose");

const logHistorySchema = new mongoose.Schema(
  {
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
    username: { type: String },
    ip: { type: String },
    location: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("log-history", logHistorySchema);
