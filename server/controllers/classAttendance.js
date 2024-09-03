const { default: mongoose } = require("mongoose");
const moment = require("moment");
const Class = require("../models/Class");
const Attendance = require("../models/Attendence");
const dateRange = require("../helper/dateRange");

/**
 *
 * @desc Create attendance Controller
 * @route POST /api/class/create
 * @returns 201: {msg: "success", data:{}}, 500  {errors: { common: { msg: err.message } }},
 */
// eslint-disable-next-line consistent-return
exports.createClass = async (req, res) => {
  const classData = req.body;
  const classDays = classData.classDays;
  const startDate = classData.startDate;
  const endDate = classData.endDate;
  try {
    const dates = dateRange(startDate, endDate);
    let allAttendance = [];
    seriesId = mongoose.Types.ObjectId();
    if (dates.length > 1) {
      for (let index in dates) {
        let date = dates[index];
        let dayName = moment(new Date(dates[index])).format("dddd");
        if (classDays.includes(dayName)) {
          let classStartDate = moment(startDate).date(moment(date).date());
          let classEndDate = moment(endDate).date(moment(date).date());
          let NewClass = {
            ...classData,
            seriesId,
            startDate: classStartDate,
            endDate: classEndDate,
            wholeSeriesEndDate: endDate,
            wholeSeriesStartDate: startDate,
          };
          allAttendance.push(NewClass);
        }
      }
    } else if (dates.length === 1) {
      let NewClass = {
        ...classData,
        startDate: endDate,
        endDate: startDate,
        seriesId,
        wholeSeriesEndDate: endDate,
        wholeSeriesStartDate: startDate,
      };
      allAttendance.push(NewClass);
    }
    await Class.insertMany(allAttendance)
      .then((result) => {
        res.send({
          msg: "Class scheduled succefully!",
          data: result,
          success: true,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          errors: { common: { msg: error.message } },
        });
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
};

/**
 *
 * @desc Update attendance Controller
 * @route POST /api/class/update
 * @returns 201: {msg: "success", data:{}}, 500  {errors: { common: { msg: err.message } }},
 */
// eslint-disable-next-line consistent-return
exports.updateClass = async (req, res) => {
  const id = req.body?._id;
  Class.findByIdAndUpdate(id, { $set: req.body })
    .then((data) => {
      res.status(200).json({
        success: true,
        msg: "Class successfully updated",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        errors: { common: { msg: error.message } },
      });
    });
};
/**
 * @desc Get all classes of user
 * @route GET api/class/all/:userId
 * @returns
 */
exports.getClasses = async (req, res) => {
  const { userId } = req.params;
  try {
    const classes = await Class.find({ userId });
    return res.status(200).json({
      success: true,
      data: classes,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
};

/**
 * @desc Get information of a class
 * @route GET api/class/info/:classId
 * @return
 */
exports.getClassInfo = async (req, res) => {
  const { classId } = req.params;
  try {
    const classEvent = await Class.findById(classId);
    if (!classEvent) {
      res.status(404).json({ msg: "Not Found" });
    }
    return res.status(200).json(classEvent);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

/**
 * @desc Delete a Class by class Id
 * @route GET api/class/info/:classId
 * @return
 */
exports.deleteClass = async (req, res) => {
  const { classId } = req.params;
  try {
    await Class.findByIdAndDelete(classId);
    return res.status(200).json({ success: true, msg: "Successfully deleted" });
  } catch (err) {
    return res.status(404).json({ success: false, errors: { common: { msg: err.message } } });
  }
};

/**
 * @desc Create a Class mark-attendance by class Id
 * @route GET api/class/mark-attendance
 * @return
 */
exports.markAttendance = async (req, res) => {
  const { classId, contactId } = req.body;
  const newAttendance = new Attendance({ ...req.body });
  try {
    const attendanceData = await Attendance.findOne({
      classId: classId,
      contactId: contactId,
    });

    if (attendanceData) {
      return res.status(500).json({
        errors: { common: { msg: "Attendance marked already for student" } },
      });
    } else {
      newAttendance
        .save()
        .then((data) => {
          return res.status(200).json({ success: true, msg: "Successfully added" });
        })
        .catch((error) => {
          return res.status(500).json({
            errors: { common: { msg: error.message } },
          });
        });
    }
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

/**
 * @desc Create a Class mark-attendance by class Id
 * @route GET api/class/mark-attendance
 * @return
 */
exports.getAttendance = async (req, res) => {
  const { classId } = req.params;
  try {
    const attendees = await Attendance.find({ classId });
    return res.status(200).json({
      success: true,
      data: attendees,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
};

/**
 * @desc Delete a Attendance by attendance Id
 * @route GET api/class/info/:attendanceId
 * @return
 */
exports.deleteAttendance = async (req, res) => {
  const { attendanceId } = req.params;
  try {
    await Attendance.findByIdAndDelete(attendanceId);
    return res.status(200).json({ success: true, msg: "Successfully deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: { common: { msg: err.message } } });
  }
};
