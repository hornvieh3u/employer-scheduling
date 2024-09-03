const mongoose = require("mongoose");

const MarketingEmail = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    from: {
      type: String,
    },
    toType: {
      type: String,
      enum: ["email", "smartlist"],
    },
    to: {
      type: String,
    },
    subject: {
      type: String,
    },
    message: {
      type: String,
    },
    status: [
      {
        type: String,
        // enum: ["sent", "draft", "spam"],
        default: "sent",
      },
    ],
    timestamp: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isStarred: {
      type: Boolean,
      default: false,
    },
    attachments: [
      {
        id: {
          type: String,
        },
        name: {
          type: String,
        },
        url: {
          type: String,
        },
        type: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("marketing-email", MarketingEmail);
