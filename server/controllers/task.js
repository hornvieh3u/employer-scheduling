/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable radix */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */

const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const moment = require("moment");
const { Task, CheckList, ScheduleTask, ScheduleCheckList } = require("../models/index/index");
const { SendMail } = require("../service/sendMail");
const { getDayName } = require("../Utilities/useDate");
const { documentEmailTemplate } = require("../constants/emailTemplates");

exports.newTask = asyncHandler(async (req, res) => {
  const { taskName, startDate, points, repeat, allowAsNa, isActive, _id, email, assignee } =
    req.body;
  try {
    if (!taskName || taskName === "") {
      throw Error("Task Name ");
    }

    if (_id !== "") {
      // Lets Update Task
      const task = await Task.findById(_id);

      if (!task) throw Error("task not found");

      task.taskName = taskName;
      task.startDate = startDate;
      task.points = points;
      task.repeat = repeat;
      task.allowAsNa = allowAsNa;
      task.isActive = isActive;
      task.email = email;
      task.assignee = assignee
        ? {
            ...assignee,
            value: mongoose.Types.ObjectId(assignee.value),
          }
        : task.assignee;

      await task.save();
      return res.status(200).send("Task Updated");
    }

    const task = new Task({
      userId: req.user._id,
      taskName,
      startDate,
      points,
      repeat,
      allowAsNa,
      isActive,
      email,
      assignee,
    });

    await task.save();

    return res.status(201).json({
      success: "New task created successful",
    });
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
});

exports.updateTask = async (req, res) => {
  const { projectId, taskName, isCompleted } = req.body;
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        errors: { common: { msg: "No task data found" } },
      });
    }

    task.projectId = projectId || task.projectId;
    task.taskName = taskName || task.taskName;
    task.isCompleted = isCompleted || task.isCompleted;
    await task.save();

    return res.status(200).json({
      success: "Task updated successful",
    });
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        errors: { common: { msg: "No task data found" } },
      });
    }

    task.isDelete = true;
    await task.save();

    return res.status(200).json({
      success: "Task deleted successful",
    });
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    let { pageSize, page } = req.query;
    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10;
    const skip = (page - 1) * pageSize;

    const query = {
      userId: mongoose.Types.ObjectId(req.user._id),
      isDelete: false,
    };

    const tasks = await Task.aggregate([
      {
        $match: query,
      },

      {
        $lookup: {
          from: "checklists",
          localField: "_id",
          foreignField: "taskId",
          as: "checkList",
        },
      },

      {
        $facet: {
          metadata: [{ $count: "total" }, { $addFields: { page } }],
          data: [{ $skip: skip }, { $limit: pageSize }],
        },
      },
    ]);

    const data = {
      list: tasks.length > 0 ? tasks[0].data : [],
      total: tasks[0].metadata.length > 0 ? tasks[0].metadata[0].total : 0,
      noOfPage: tasks[0].metadata.length > 0 ? tasks[0].metadata[0].page : 0,
    };
    res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.getTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({ _id: id, isDelete: false });
    if (!task) {
      return res.status(500).json({
        message: "No task data found",
      });
    }
    res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.saveCheckList = async (req, res) => {
  const { checkList, taskId } = req.body;
  try {
    // Remove Previous Checklist
    await CheckList.deleteMany({ taskId });
    // Lets Add Again
    const list = checkList.map((x) => ({ ...x, taskId }));
    const NewCheckList = await CheckList.insertMany(list);
    res.status(200).json(NewCheckList);
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.sendProofEmail = async (req, res) => {
  try {
    console.log(req.body);
    const { from, fullName, to, taskName, subTaskName, content, isUpload, isComplete } = req.body;
    const emailBody = documentEmailTemplate({
      type: `new`,
      senderName: fullName,
      docLink: content,
      senderEmail: from,
      recipientName: "Recipient",
      message: `${taskName}/${subTaskName} is completed.`,
    });
    SendMail({
      from: `${fullName} via MyManager <hello@mymanager.com>`,
      recipient: "glassespiger@gmail.com",
      subject: `New proof message from ${from}`,
      body: emailBody,
      replyTo: from,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(error);
  }
};

exports.getTodaysTask = async (req, res) => {
  // const {} = req.query;
  console.log(req.body, req.params);
  try {
    // today day name
    const d = new Date();
    const day = parseInt(moment(d).format("DD"));
    const month = parseInt(moment(d).format("MM"));
    const year = d.getFullYear();
    const todayName = getDayName(d);

    // Check Todays Data is Completed Or Not

    const tasks = await Task.aggregate([
      {
        $match: {
          repeat: { $in: [todayName] },
          isActive: true,
          userId: mongoose.Types.ObjectId(req.user._id),
        },
      },
      // find  All CheckList of current task  ************************
      {
        $lookup: {
          from: "checklists",
          localField: "_id",
          foreignField: "taskId",
          as: "checkList",
          pipeline: [
            {
              $project: {
                title: 1,
                dateTime: 1,
                proofType: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "schedule-tasks",
          localField: "_id",
          foreignField: "taskId",
          as: "schedule",
          // check today is Matched Or not ****************************************
          pipeline: [
            {
              $project: {
                taskId: 1,
                dayName: 1,
                _date: 1,
                employeeId: 1,
                year: { $year: "$_date" },
                month: { $month: "$_date" },
                day: { $dayOfMonth: "$_date" },
              },
            },
            {
              $match: {
                day,
                month,
                year,
              },
            },

            // Find Completed Checklist with Pipeline *************************************
            {
              $lookup: {
                from: "checklist-ans",
                localField: "_id",
                foreignField: "scheduleTaskId",
                as: "checkList",
                pipeline: [
                  {
                    $lookup: {
                      from: "employee-contacts",
                      localField: "employeeId",
                      foreignField: "_id",
                      as: "employee",
                    },
                  },
                  // { $unwind: "$employee" },
                ],
              },
            },
          ],
        },
      },
    ]);

    if (tasks.length > 0) {
      // check if any task has not schedule
      const hasNotSchedule = tasks.find((x) => x.schedule.length === 0);
      if (hasNotSchedule) {
        // Add New Tasks to Schedule
        const taskScheduleList = tasks
          .filter((x) => x.schedule.length === 0)
          .map((x) => ({
            taskId: x._id,
            dayName: todayName,
            _date: moment.now(),
          }));

        // insert many
        const newScheduleTasks = await ScheduleTask.insertMany(taskScheduleList);
        // Build Data And return to response
        const buildTasks = tasks.map((task) => {
          const scheduleTask = newScheduleTasks.filter(
            (x) => String(x.taskId) === String(task._id)
          );

          return {
            ...task,
            schedule: task.schedule.length === 0 ? scheduleTask : task.schedule,
          };
        });

        return res.json(buildTasks);
      }
    }
    return res.json(tasks);
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.saveTaskCheckListTodos = async (req, res) => {
  const { schedule, _id, checkList: originalCheckList } = req.body;
  try {
    // today day name

    const { user } = req.user;

    // await ScheduleCheckList.deleteMany();

    const { checkList } = schedule[0];
    const newCheckListAns = checkList
      .filter((todo) => todo._id === undefined)
      .map((x) => ({ ...x, employeeId: user.employeeId }));

    const scheduleId = schedule[0]._id;

    if (newCheckListAns) {
      // Fetch All checklist by scheduleId

      const checkListByScheduleId = await ScheduleCheckList.find({
        scheduleTaskId: scheduleId,
      });

      const filteredNewCheckList = newCheckListAns.filter((x) => {
        const checkAlreadyExist = checkListByScheduleId.find(
          (item) => String(item.checkListId) === String(x.checkListId)
        );

        if (checkAlreadyExist) {
          return false;
        }

        return true;
      });

      await ScheduleCheckList.insertMany(filteredNewCheckList);
    }

    // Perform Update query
    // find changed
    const updateableCheckListAns = checkList.filter((todo) => todo._id !== "" && todo.touched);

    if (updateableCheckListAns) {
      for (const todo of updateableCheckListAns) {
        const checkList = await ScheduleCheckList.findById(todo?._id);
        if (checkList) {
          checkList.ans = todo.ans;
          await checkList.save();
        }
      }
    }

    // if finished then check checklist
    const taskCheckList = await ScheduleCheckList.find({
      scheduleTaskId: scheduleId,
    });

    if (originalCheckList.length === taskCheckList.length) {
      const findScheduleTask = await ScheduleTask.findById(scheduleId);
      if (findScheduleTask) {
        findScheduleTask.isComplete = true;
        const updated = await findScheduleTask.save();
      }
    }

    return res.json({});
  } catch (error) {
    return res.status(500).send(error);
  }
};

// Get Past Due Schedule CheckList

exports.getPastDueScheduleCheckList = async (req, res) => {
  // const {} = req.query;
  try {
    // today day name
    const d = new Date();
    // const day = parseInt(moment(d).format("DD"));
    // const month = parseInt(moment(d).format("MM"));
    // const year = d.getFullYear();
    // const todayName = getDayName(d);

    // Check Todays Data is Completed Or Not
    let tasks = [];

    // build today
    const _d_start = d.toLocaleDateString(`fr-CA`).split("/").join("-");
    const _d_end = d.toLocaleDateString(`fr-CA`).split("/").join("-");
    const start = new Date(`${_d_start}T00:00:00.00Z`);
    const end = new Date(`${_d_end}T23:59:59.999Z`);

    let query = {};
    query = {
      ...query,
      _date: {
        // $gte: start,
        $lt: start,
      },
      isComplete: false,
    };

    // aggregation

    tasks = await ScheduleTask.aggregate([
      { $match: query },
      // root task
      {
        $lookup: {
          from: "tasks",
          localField: "taskId",
          foreignField: "_id",
          as: "task",
          pipeline: [
            {
              $lookup: {
                from: "checklists",
                localField: "_id",
                foreignField: "taskId",
                as: "checkList",
                pipeline: [
                  {
                    $project: {
                      title: 1,
                      dateTime: 1,
                      proofType: 1,
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      // { $addFields: { userId: "$task" } },

      // Find Completed Checklist with Pipeline *************************************
      {
        $lookup: {
          from: "checklist-ans",
          localField: "_id",
          foreignField: "scheduleTaskId",
          as: "checkList",
          pipeline: [
            {
              $lookup: {
                from: "employee-contacts",
                localField: "employeeId",
                foreignField: "_id",
                as: "employee",
              },
            },
            // { $unwind: "$employee" },
          ],
        },
      },
    ]);

    // format data
    const formatedTasks = [];
    for (const task of tasks) {
      if (String(task.task[0].userId) === String(req.user._id)) {
        formatedTasks.push({
          ...task.task[0],
          schedule: [{ ...task, task: null }],
        });
      }
    }

    return res.json(formatedTasks);
  } catch (error) {
    return res.status(500).send(error);
  }
};
