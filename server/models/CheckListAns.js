const mongoose = require("mongoose");

const ScheduleTaskSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Types.ObjectId,
      ref: "tasks",
      required: true,
    },
    dayName: {
      type: String,
      required: true,
    },
    _date: {
      type: Date,
      required: true,
    },
    isComplete: {
      type: Boolean,
      required: false,
      default: false,
    },
    employeeId: {
      type: mongoose.Types.ObjectId,
      ref: "checklists",
      // required: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const checkListSchema = new mongoose.Schema(
  {
    scheduleTaskId: {
      type: mongoose.Types.ObjectId,
      ref: "schedule-tasks",
      required: true,
    },

    checkListId: {
      type: mongoose.Types.ObjectId,
      ref: "checklists",
      required: true,
    },
    ans: {
      type: String,
      required: true,
    },
    _date: {
      type: Date,
      required: true,
    },

    // user Id
    employeeId: {
      type: mongoose.Types.ObjectId,
      ref: "employee-contacts",
      // required: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const ScheduleTask = mongoose.model("schedule-tasks", ScheduleTaskSchema);
const ScheduleCheckList = mongoose.model("checklist-ans", checkListSchema);

module.exports = { ScheduleTask, ScheduleCheckList };
