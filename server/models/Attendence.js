const mongoose = require("mongoose");

const schema = mongoose.Schema;
const attendenceSchema = schema(
  {
    image: {
      type: String,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    className: { type: String, required: true },
    userId: {
      type: String,
      index: true,
    },
    classId: {
      type: String,
    },
    dateTime: {
      type: String,
    },
    contactId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("attendence", attendenceSchema);
