const { default: mongoose } = require("mongoose");
const { TaskContact } = require("../models/index/index");

exports.newTaskContact = async (req, res) => {
  const { projectId, clientId } = req.body;
  const { user } = req;

  try {
    const clientContact = new TaskContact({
      userId: user._id,
      projectId,
      clientId,
    });

    await clientContact.save();

    return res.status(201).json({
      success: "New task contact created successful",
    });
  } catch (errro) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.updateTaskContact = async (req, res) => {
  const { clientId, projectId } = req.body;
  const { id } = req.params;

  try {
    const taskContact = await TaskContact.findById(id);

    if (!taskContact) {
      return res.status(404).json({
        errors: { common: { msg: "No task contact data found" } },
      });
    }

    taskContact.clientId = clientId ? clientId : taskContact.clientId;
    taskContact.projectId = projectId ? projectId : taskContact.projectId;
    await taskContact.save();

    return res.status(200).json({
      success: "Task contact updated successful",
    });
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.deleteTaskContact = async (req, res) => {
  const { id } = req.params;

  try {
    const taskContact = await TaskContact.findById(id);

    if (!taskContact) {
      return res.status(404).json({
        errors: { common: { msg: "No task contact data found" } },
      });
    }

    taskContact.isDelete = true;
    await taskContact.save();

    return res.status(200).json({
      success: "Task contact deleted successful",
    });
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.getTaskContacts = async (req, res) => {
  try {
    let { pageSize, page } = req.query;
    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10;
    const skip = (page - 1) * pageSize;
    const { user } = req;

    const taskContact = await TaskContact.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(user._id),
          isDelete: false,
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
      list: taskContact.length > 0 ? taskContact[0].data : [],
      total: taskContact[0].metadata.length > 0 ? taskContact[0].metadata[0].total : 0,
      noOfPage: taskContact[0].metadata.length > 0 ? taskContact[0].metadata[0].page : 0,
    };

    res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.getTaskContact = async (req, res) => {
  const { id } = req.params;

  try {
    const taskContact = await TaskContact.findOne({ _id: id, isDelete: false });
    if (!taskContact) {
      return res.status(500).json({
        message: "No task contact data found",
      });
    }
    res.status(200).json(taskContact);
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};
