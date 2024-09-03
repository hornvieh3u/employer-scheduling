const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { Goal } = require("../models/index/index");

exports.createGoal = asyncHandler(async (req, res) => {
  try {
    const payload = req.body;
    payload.userId = mongoose.Types.ObjectId(req.user._id);
    const goalData = await Goal.create(payload);
    return res.status(201).send(goalData);
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getGoal = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const goals = await Goal.find({ userId: _id });
    return res.status(200).json(goals);
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.updateGoalById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const goal = await Goal.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(id),
        userId: mongoose.Types.ObjectId(req.user._id),
      },
      {
        $set: payload,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.deleteGoalById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await Goal.findOneAndDelete({
      _id: mongoose.Types.ObjectId(id),
      userId: mongoose.Types.ObjectId(req.user._id),
    });
    if (goal === null) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    return res.status(200).json({
      success: true,
      msg: "Delete goal successfully.",
    });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getGoalById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await Goal.findOne({
      _id: mongoose.Types.ObjectId(id),
      userId: mongoose.Types.ObjectId(req.user._id),
    });

    if (goal === null) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    return res.status(200).json(goal);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});
