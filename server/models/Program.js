const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const schema = mongoose.Schema;
const programSchema = new schema(
  {
    programName: {
      type: String,
      required: true,
      unique: true,
      maxlength: 32,
    },
    color: {
      type: String,
    },
    lable: {
      type: Number,
    },
    total_rank: {
      type: Number,
    },
    progression: {
      type: String,
    },
    type: {
      type: String,
    },
    program_image: {
      type: String,
    },
    requirement: {
      type: String,
    },
    program_category: [
      {
        type: schema.Types.ObjectId,
        ref: "pcategory",
      },
    ],
    program_rank: [
      {
        type: schema.Types.ObjectId,
        ref: "Program_rank",
      },
    ],
    userId: {
      type: String,
      index: true,
    },
    adminId: {
      type: String,
      index: true,
    },
    status: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Program", programSchema);
