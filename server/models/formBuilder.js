// declare mongoose
const mongoose = require("mongoose");

const formBuilderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  memberType: {
    type: String,
    required: true,
  },
  automateEntry: {
    type: Boolean,
    required: true,
  },
  smartList: {
    type: String,
  },
  subCategory: {
    type: String,
  },
  formType: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("formBuilder", formBuilderSchema);
