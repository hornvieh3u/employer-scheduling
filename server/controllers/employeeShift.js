const { EmployeeShift, EmployeeSchedule } = require("../models/index/index");

// shift crud
exports.getShiftsList = async (req, res) => {
  const params = req.query;
  try {
    const shifts = await EmployeeShift.find({ userId: req.user._id });
    const total = await EmployeeShift.count({});
    return res.status(200).send({ shifts, total });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
}

exports.setShift = async (req, res) => {
  const params = req.body;
  const user = req.user;
  try {
    const response = await EmployeeShift.create({
      title: params.title,
      startTime: params.startTime,
      endTime: params.endTime,
      note: params.note,
      userId: user._id
    });

    EmployeeSchedule.create({
      date: params.date,
      shiftId: response._id,
      userId: user._id
    });
    
    return res.status(200).send({
      success: true,
      message: "Shift added successfully",
      response,
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
}

exports.updateShift = async (req, res) => {
  const { id, shift } = req.body;
  try {
    const response = await EmployeeShift.updateOne({
      _id: id
    }, {
      title: shift.title,
      startTime: shift.startTime,
      endTime: shift.endTime,
      note: shift.note,
    });

    return res.status(200).send({
      success: true,
      message: "Shift updated successfully",
      response,
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
}

exports.deleteShift = async (req, res) => {
  const id = req.body.id;
  try {
    const response = await EmployeeShift.deleteOne({ _id: id });
    return res.send({
      success: true,
      message: "Shift deleted successfully",
      response,
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
}