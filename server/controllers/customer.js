const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const { Customer } = require("../models/index/index");

exports.addCustomer = asyncHandler(async (req, res) => {
  const payload = {
    userId: mongoose.Types.ObjectId(req.user._id),
    ...req.body,
  };
  try {
    await Customer.create(payload);
    return res.status(201).json({ success: true, message: "User created successfully" });
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getCustomers = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const customers = await Customer.find({ userId: _id });
    return res.status(200).json(customers);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});
