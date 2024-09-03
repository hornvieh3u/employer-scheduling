const mongoose = require("mongoose");

const employeeScheduleSchema = new mongoose.Schema({
    date: {
        type: String,
    },
    shiftId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee-shift",
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee-group",
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee-contact",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth",
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("employee-schedule", employeeScheduleSchema);