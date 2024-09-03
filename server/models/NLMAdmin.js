const mongoose = require("mongoose");

const nlmAdminSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    adminType: {
      type: String,
      enum: ["super-admin", "admin", "staff"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("NLM_Admin", nlmAdminSchema);
