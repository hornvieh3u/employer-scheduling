const mongoose = require("mongoose");

const Courses = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    courseName: {
      type: String,
      trim: true,
      required: true,
    },
    curriculamType: {
      type: String,
      trim: true,
      required: true,
    },
    coursePrice: {
      type: Number,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    description: {
      type: String,
      trim: true,
    },
    courseType: {
      type: String,
      default: "NA",
    },
    courseDuration: {
      type: String,
      default: "NA",
    },
    curriculam: {
      type: Number,
      default: "NA",
    },
    courseImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("courses", Courses);
