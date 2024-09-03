const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rowData = new Schema({
  project: {
    type: String,
  },

  date: {
    type: Date,
  },
  manager: {
    userID: { type: String },
    value: { type: String },
  },

  timeline: {
    type: Date,
  },
  status: {
    type: [
      {
        userID: { type: String },
        value: { type: String },
      },
    ],
    default: undefined,
  },

  people: {
    type: [
      {
        userID: { type: String },
        value: { type: String },
      },
    ],
    default: undefined,
  },
  text: {
    type: String,
  },
});

const TableSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
    required: true,
  },
  otherUser: [mongoose.Schema.Types.ObjectId],
  title: {
    type: String,
    required: true,
  },
  rowData: [rowData],
});

module.exports = mongoose.model("projectManagement", TableSchema);
