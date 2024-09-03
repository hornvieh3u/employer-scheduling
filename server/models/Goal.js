const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const GoalSchema = new Schema({
  userId: {
    type: ObjectId,
    required: true,
    ref: "auth",
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["list", "calender", "board"],
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
    validate: {
      // eslint-disable-next-line object-shorthand, func-names
      validator: function (value) {
        return value > this.startDate;
      },
      message: `Due date should be greater than invoice date`,
    },
  },
  assignee: {
    type: ObjectId,
    ref: "employee",
  },
  tags: {
    type: Array,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("goal", GoalSchema);
