const { Progression } = require("../models/index/index");
const mongoose = require("mongoose");

exports.createProgression = async (req, res) => {
  const payload = req.body;
  const userId = req.user._id;
  try {
    payload.userId = mongoose.Types.ObjectId(userId);
    const newProgression = new Progression(payload);
    const data = await newProgression.save();
    if (data.lenght < 1) {
      return res.send({
        msg: "unable to create progression",
        success: false,
      });
    }
    return res.send({
      msg: "progression created successfully",
      success: true,
    });
  } catch (err) {
    return res.send({ error: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.progressionDetails = async (req, res) => {
  const userId = req.user._id;
  try {
    const data = await Progression.find({
      userId: mongoose.Types.ObjectId(userId),
      isDeleted: false,
    }).populate({
      path: "categoryId",
      model: "category",
      match: { isDeleted: false },
    });
    if (data.length > 0) {
      return res.send({
        data: data,
        success: true,
      });
    }
    return res.send({
      msg: "There is not data for this user",
      success: false,
    });
  } catch (err) {
    return res.send({ error: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.updateProgression = async (req, res) => {
  const userId = req.user._id;
  const _id = req.params.progressionId;
  const payload = req.body;
  try {
    let updateProgression = await Progression.updateOne(
      { _id: mongoose.Types.ObjectId(_id), userId: mongoose.Types.ObjectId(userId) },
      { $set: payload }
    );
    if (updateProgression.modifiedCount < 1) {
      return res.send({
        msg: "unable to update progression",
        success: false,
      });
    }
    return res.send({
      msg: "progression updated successfully",
      success: true,
    });
  } catch (err) {
    return res.send({ error: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.removeProgression = async (req, res) => {
  const _id = req.params.progressionId;
  const userId = req.user._id;
  try {
    let deleteProgression = await Progression.updateOne(
      { _id: mongoose.Types.ObjectId(_id), userId: mongoose.Types.ObjectId(userId) },
      { isDeleted: true }
    );
    if (deleteProgression.modifiedCount < 1) {
      return res.send({
        msg: "unable to delete progression",
        success: false,
      });
    }
    return res.send({
      msg: "progression deleted successfully",
      success: true,
    });
  } catch (err) {
    return res.send({ error: err.message.replace(/\"/g, ""), success: false });
  }
};
