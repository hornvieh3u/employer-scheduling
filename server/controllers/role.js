const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const { Roles } = require("../models/index/index");

exports.createRole = asyncHandler(async (req, res) => {
  try {
    const rolePayload = {
      userId: req.user._id,
      roleName: req.body.roleName,
      permissions: req.body.permissions,
    };
    const response = await Roles.create(rolePayload);
    return res.send({
      success: true,
      message: "Role Added successfully",
      response,
    });
  } catch (error) {
    return res.send(error);
  }
});

exports.getAllRole = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  try {
    const data = await Roles.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
    ]);
    return res.status(200).json(data);
  } catch (error) {
    return res.send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getRoleById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Roles.findOne(mongoose.Types.ObjectId(id));
    if (data) {
      return res.status(200).json(data);
    }
    return res.status(404).json({ message: "No Role Found!" });
  } catch (error) {
    return res.send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.deleteById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Roles.findOne({ _id: id });
    if (!data) {
      return res.status(404).json({ success: false, message: "No Role Found" });
    }
    await Roles.deleteOne({ _id: id });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.updateById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const update = await Roles.updateOne({ _id: mongoose.Types.ObjectId(id) }, req.body, {
      new: true,
    });
    if (update.modifiedCount === 1) {
      return res.status(200).json({ success: true });
    }
    return res.status(404).json({ success: false, message: "role not updated!" });
  } catch (error) {
    return res.send({ message: error.message.replace(/"/g, ""), success: false });
  }
});
