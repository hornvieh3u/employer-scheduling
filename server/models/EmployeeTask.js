const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const TaskSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ["form", "task"],
    },
    documentUrl: {
      type: String,
    },
    empRoleId: {
      type: String,
      ref: "role",
      required: true,
    },
    empId: {
      type: Array,
    },
    completedBy: {
      type: String,
      ref: "role",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "declined", "rejected", "waiting_for_approval"],
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("employee-task", TaskSchema);
