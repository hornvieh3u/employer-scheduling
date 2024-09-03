/* eslint-disable no-useless-escape */
const mongoose = require("mongoose");

const schema = mongoose.Schema;

const propertiesSchema = schema(
  {
    id: {
      type: Number,
    },
    color: {
      type: String,
    },
    _type: {
      type: String,
    },
    type: {
      type: String,
    },
    dataLabel: {
      type: String,
    },
    ipAddress: {
      type: String,
    },
    recipient: {
      type: Object,
    },
    page: {
      type: Number,
    },
    x: {
      type: Number,
    },
    y: {
      type: Number,
    },
    active: {
      type: Boolean,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    signValue: {
      type: Object,
      value: { name: { type: String }, path: { type: String } },
    },
  },
  { _id: false }
);

const recipientSchema = schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please provide valid email"],
    },
    hashCode: {
      type: String,
    },
    url: {
      type: String,
    },
    color: {
      type: String,
    },
    hasViewed: {
      type: Boolean,
      default: false,
    },
    auth: {
      type: Object,
      value: { token: { type: String }, expireTime: { type: Number } },
    },
  },
  { _id: false }
);

const docMessageSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { _id: false }
);
/* Status
waiting,viewed, completed,attachment
*/
const documentRecipientSchema = new mongoose.Schema(
  {
    documentId: {
      type: Object,
      required: true,
    },
    documentUrl: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please provide valid email"],
    },
    recipients: {
      type: Array,
      value: [recipientSchema],
    },
    docMessage: {
      type: Object,
      value: docMessageSchema,
    },
    properties: {
      type: Array,
      value: [propertiesSchema],
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
    },
    isSent: {
      type: Boolean,
    },
    isVoided: {
      type: Boolean,
    },
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("document-recipient", documentRecipientSchema);
