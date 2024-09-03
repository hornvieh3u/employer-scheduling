const mongoose = require("mongoose");

const employeeGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    positionIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee-position"
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth",
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("employee-group", employeeGroupSchema);