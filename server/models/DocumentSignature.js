const mongoose = require("mongoose");

const signatureSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  fullName: {
    type: String,
    required: true,
  },
  isSelected: {
    type: Boolean,
    required: true,
  },
  path: {
    type: String,
    required: false,
  },
  initials: {
    type: Object,
  },
});

// eslint-disable-next-line no-unused-vars
const initialSchema = new mongoose.Schema({
  initial: {
    type: String,
    required: false,
  },
  path: {
    type: String,
    required: false,
  },
});

const stampSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  departmentName: {
    type: String,
    required: false,
  },
  path: {
    type: String,
    required: false,
  },
  isSelected: {
    type: Boolean,
    required: true,
  },
});
const documentSignatureSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    // eslint-disable-next-line no-useless-escape
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please provide valid email"],
  },

  signatures: {
    type: Array,
    value: [signatureSchema],
  },
  stamps: {
    type: Array,
    value: [stampSchema],
  },
});
module.exports = mongoose.model("document-signature", documentSignatureSchema);
