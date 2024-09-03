const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { EmployeeShift, EmployeeSchedule } = require("../models/index/index");

exports.getWeekSchedules = async (req, res) => {
  const params = req.query;
  const { user } = req;
  try {
    const shiftsInSchedule = await EmployeeSchedule
      .aggregate([
        {
          $lookup: {
            from: "employee-shifts",
            localField: "shiftId",
            foreignField: "_id",
            as: "shift",
          },
        },
        {
          $match: {
            userId: ObjectId(user._id),
            date: { $gte: params.startDate, $lte: params.endDate }
          },
        },
        {
          $project: {
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
            userId: 0,
          },
        },
      ])
      .exec();

    const employeesInSchedule = await EmployeeSchedule
      .aggregate([
        {
          $match: {
            userId: ObjectId(user._id),
            employeeId: { $ne: null }
          },
        },
        {
          $group: { _id: "$employeeId" }
        },
        {
          $lookup: {
            from: "employee-contacts",
            localField: "_id",
            foreignField: "_id",
            as: "employee",
          },
        },
        {
          $project: {
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
            userId: 0,
            shiftId: 0,
          },
        },
      ])
      .exec();
    return res.status(200).send({ shiftsInSchedule, employeesInSchedule });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.addEmployeesToSchedule = (req, res) => {
  const { employeeIds } = req.body;
  const { user } = req;
  try {
    employeeIds.forEach(async id => {
      await EmployeeSchedule.create({
        employeeId: id,
        userId: user._id
      });
    });
    return res.status(200).send({
      success: true,
    });
  } catch(error) {

  }
}

exports.addShiftsToSchedule = async (req, res) => {
  const { params } = req.body;
  const { user } = req;
  try {
    const response = await EmployeeShift.create({
      title: params.shiftTitle,
      startTime: params.shiftStartTime,
      endTime: params.shiftEndTime,
      note: params.shiftNote,
      userId: user._id
    });

    params.dates.forEach(async date => {
      let createSchedule = {
        date: date,
        shiftId: response._id,
        userId: user._id
      }
      if( params.shiftEmployeeId ) createSchedule.employeeId = params.shiftEmployeeId;
      if( params.shiftGroupId ) createSchedule.groupId = params.shiftGroupId;
      
      await EmployeeSchedule.create(createSchedule);
    })

    return res.status(200).send({
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}

exports.setSchedule = async (req, res) => {
  const params = req.body;
  const { user } = req;
  try {
    const createData = {
      date: params.date,
      userId: user._id,
    };
    if( params?.shiftId ) createData.shiftId = params.shiftId;
    if( params?.groupId ) createData.shiftId = params.groupId;
    if( params?.employeeId ) createData.shiftId = params.employeeId;
    
    const response = await EmployeeSchedule.create(createData);
    return res.status(200).send({
      success: true,
      message: "Schedule created successfully",
      response,
    });
  } catch (err) {}
};

exports.updateSchedule = async (req, res) => {
  const params = req.body;
  try {
    const response = await EmployeeSchedule.updateOne(
      {
        _id: params.id,
      },
      {
        date: params.date,
        employeeId: params.employeeId,
      }
    );
    return res.status(200).send({
      success: true,
      message: "Schedule updated successfully",
      response,
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.deleteSchedule = async (req, res) => {
  const { id } = req.body;
  const { user } = req;
  try {
    const response = await EmployeeSchedule.deleteOne({ _id: id });
    return res.send({
      success: true,
      message: "Schedule deleted successfully",
      response,
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.updateShiftInSchedule = async (req, res) => {
  const { params } = req.body;
  try {
    if( params.employeeId ) {
      await EmployeeSchedule.updateOne({
        _id: params.id,
        shiftId: params.shiftId
      }, {
        $set: {
          employeeId: params.employeeId,
          date: params.date
        }
      })
    }

    if( params.groupId ) {
      await EmployeeSchedule.updateOne({
        _id: params.id,
        shiftId: params.shiftId
      }, {
        $set: {
          groupId: params.groupId,
          date: params.date
        },
        $unset: { employeeId: 1 }
        
      })
    }

    res.json({
      success: true
    });
  } catch(error) {
    console.log(error);
  }
}