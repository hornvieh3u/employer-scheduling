const mongoose = require("mongoose");

const schema = mongoose.Schema;
const membershipSchema = schema(
  {
    membership_name: {
      type: String,
      required: true,
    },
    membershipDoc: {
      type: String,
    },
    membershipDocName: {
      type: String,
    },
    membershipThumbnail: {
      type: String,
    },
    color: {
      type: String,
      required: true,
    },
    membership_type: {
      type: String,
      required: true,
    },
    duration_time: {
      type: String,
      required: true,
    },
    duration_type: {
      type: String,
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
    down_payment: {
      type: Number,
      required: true,
    },
    payment_type: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    due_every: {
      type: String,
      required: true,
    },
    isfavorite: {
      type: Number,
      default: 0,
    },
    isSignatured: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: String,
    },
    no_of_payment: {
      type: String,
    },
    isRecurring: {
      type: Number,
    },
    adminId: {
      type: String,
      index: true,
    },
    regular_price: {
      type: Number,
    },
    docType: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("membership", membershipSchema);
