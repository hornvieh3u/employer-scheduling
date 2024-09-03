const mongoose = require("mongoose");

const Roles = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    roleName: {
      type: String,
      trim: true,
    },
    permissions: [
      {
        dashboard: {
          type: Boolean,
          default: false,
        },
        contacts: {
          type: Boolean,
          default: false,
        },
        taskAndGoals: {
          type: Boolean,
          default: false,
        },
        calendar: {
          type: Boolean,
          default: false,
        },
        document: {
          type: Boolean,
          default: false,
        },
        marketing: {
          type: Boolean,
          default: false,
        },
        shop: {
          type: Boolean,
          default: false,
        },
        myBusiness: {
          type: Boolean,
          default: false,
        },
        finance: {
          type: Boolean,
          default: false,
        },
        fileManager: {
          type: Boolean,
          default: false,
        },
        settings: {
          type: Boolean,
          default: false,
        },
        myCMA: {
          type: Boolean,
          default: false,
        },
      },
      { _id: false },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("roles", Roles);
