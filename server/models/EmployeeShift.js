const mongoose = require("mongoose");

const employeeShiftSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    note: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth",
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("employee-shift", employeeShiftSchema);