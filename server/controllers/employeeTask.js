const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { EmployeeTask, EmployeeContact } = require("../models/index/index");

exports.createTask = asyncHandler(async (req, res) => {
  try {
    const payload = req.body;
    payload.userId = mongoose.Types.ObjectId(req.user._id);
    payload.status = "pending";
    const employeeTaskData = await EmployeeTask.create(payload);
    return res.status(201).send(employeeTaskData);
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.updateTask = asyncHandler(async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const { _id: userId } = req.user;
    const updatedTask = await EmployeeTask.findOneAndUpdate({ _id: taskId, userId }, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).send(updatedTask);
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getTaskByUserId = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const getTasks = await EmployeeTask.find({
      userId: mongoose.Types.ObjectId(_id),
    });
    return res.status(200).send(getTasks);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getTaskByEmpRoleId = asyncHandler(async (req, res) => {
  try {
    if (req.user.user.employeeId === null) {
      return res
        .status(400)
        .json({ success: false, message: "No employee id was set. Please contact your admin" });
    }
    const empDetails = await EmployeeContact.findOne({
      _id: mongoose.Types.ObjectId(req.user.user.employeeId),
    });
    const getTaskByEmpRoleId = await EmployeeTask.aggregate([
      {
        $match: { empRoleId: empDetails.role },
      },
      {
        $lookup: {
          from: "roles",
          let: { roleId: { $toObjectId: "$empRoleId" } },
          pipeline: [
            { $match: { $expr: [{ _id: "$$roleId" }] } },
            { $project: { _id: 1, roleName: 1 } },
          ],
          as: "role",
        },
      },
      { $unwind: "$role" },
      { $project: { __v: 0 } },
    ]);
    return res.status(200).send(getTaskByEmpRoleId);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.markTaskStatus = asyncHandler(async (req, res) => {
  const { id: taskId } = req.params;
  const { status } = req.body;
  const { _id } = req.user;
  let markingDoneBy = "user";
  let markTaskStatus;
  try {
    if (req.user.user.employeeId) {
      markingDoneBy = "employee";
    }

    if (markingDoneBy === "employee") {
      if (status !== "waiting_for_approval") {
        return res
          .status(400)
          .json({ success: false, message: "Employee can only mark waiting status for tasks" });
      }
      const empDetails = await EmployeeContact.findOne({
        _id: mongoose.Types.ObjectId(req.user.user.employeeId),
      });

      markTaskStatus = await EmployeeTask.findOneAndUpdate(
        { _id: taskId, empRoleId: empDetails.role },
        { $set: { status, completedBy: req.user.user.employeeId } },
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      markTaskStatus = await EmployeeTask.findOneAndUpdate(
        {
          _id: taskId,
          userId: mongoose.Types.ObjectId(_id),
        },
        { $set: { status } },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    return res.status(200).send(markTaskStatus);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});
