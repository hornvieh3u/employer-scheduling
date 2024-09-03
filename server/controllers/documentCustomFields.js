require("dotenv").config();
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const DocumentCustomFields = require("../models/DocumentCustomFields");

// Add customField
exports.addCustomField = asyncHandler(async (req, res) => {
  try {
    const payload = { ...req.body, userId: req.user._id };
    await DocumentCustomFields.create(payload);
    res.send({
      success: true,
      message: "Custom field added successfully!",
    });
  } catch (error) {
    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});
// delete customField
exports.deleteCustomField = asyncHandler(async (req, res) => {
  const { id } = req.query;

  try {
    await DocumentCustomFields.findByIdAndDelete(mongoose.Types.ObjectId(id));
    res.send({
      success: true,
      message: "Custom field deleted successfully!",
    });
  } catch (error) {
    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

// getCustomFields for userId
exports.getFieldsByUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const data = await DocumentCustomFields.find({ userId: mongoose.Types.ObjectId(userId) });
    if (data) {
      res.send({
        success: true,
        data,
      });
    } else {
      res.send({
        success: true,
        message: "Data not found!",
      });
    }
  } catch (error) {
    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});
