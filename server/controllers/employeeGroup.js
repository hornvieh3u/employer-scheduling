const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { EmployeeGroup } = require("../models/index/index");

exports.getGroups = async (req, res) => {
  const { user } = req;
  try {
    const groups = await EmployeeGroup.aggregate([
      {
          $match: {
              userId: ObjectId(user._id)
          }
      },
      {
          $lookup: {
              from: 'employee-positions',
              localField: 'positionIds',
              foreignField: '_id',
              pipeline: [ {
                  $sort: {
                    order: 1
                  }
              } ],
              as: 'positions'
          }
      }
    ]).exec();
    const total = await EmployeeGroup.count({userId: user._id});
    return res.status(200).send({ groups, total });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.setGroup = async (req, res) => {
  const params = req.body;
  const { user } = req;
  try {
    const response = await EmployeeGroup.create({
      name: params.name,
      positionIds: params.positions,
      userId: user._id,
    });

    return res.status(200).send({
      success: true,
      message: "Group added successfully",
      response,
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.updateGroup = async (req, res) => {
  const { id, group } = req.body;
  const { user } = req;
  try {
    const response = await EmployeeGroup.updateOne(
      {
        _id: id,
      },
      {
        name: group.name,
        positionIds: group.positions,
        userId: user._id,
      }
    );

    return res.status(200).send({
      success: true,
      message: "Group updated successfully",
      response,
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.deleteGroup = async (req, res) => {
  const { id } = req.body;
  try {
    const response = await EmployeeGroup.deleteOne({ _id: id });
    return res.send({
      success: true,
      message: "Group deleted successfully",
      response,
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};
