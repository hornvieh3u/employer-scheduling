const { Workspace } = require("../models/index/index");
const { Board } = require("../models/index/index");
const { Kanban } = require("../models/index/index");

exports.newWorkspace = async (req, res) => {
  try {
    const bodyData = req.body;
    console.log(bodyData);
    const newWorkspace = new Workspace(bodyData);
    const workspaceList = await Workspace.find({ title: bodyData.title });
    if (workspaceList.length > 0) {
      const _id = workspaceList[0]._id;
      const updateWorkspace = await Workspace.updateOne({ _id: _id });
      if (updateWorkspace.modifiedCount >= 1) {
        return res.send({ msg: "The old task workspace updated successfully", success: true });
      }
      return res.send({ msg: "not created", success: false });
    } else {
      newWorkspace.save((err, success) => {
        if (err) {
          if (err) {
            return res.status(500).json({
              errors: { common: { msg: err.message } },
            });
          }
        }
        return res.status(201).json({
          success: "Workspace created successfull",
        });
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.getAllWorkspace = async (req, res) => {
  try {
    const { userId } = req.params;
    const workspaceData = await Workspace.find({
      userId: userId,
      isDelete: false,
    });

    if (workspaceData.length > 0) {
      return res.status(200).send(workspaceData);
    } else {
      let initTitle = `My first workspace`;

      const initialWorkspace = new Workspace({
        userId: userId,
        title: initTitle,
        boards: [],
      });

      initialWorkspace.save((err, success) => {
        if (err) {
          return res.status(500).json({
            errors: { common: { msg: err.message } },
          });
        }
      });
      return res.status(200).send([initialWorkspace]);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.getWorkspace = (req, res) => {
  try {
    const { workspaceId } = req.params;
    console.log("workspaceId", workspaceId);
    Workspace.find({
      _id: workspaceId,
    })
      .populate("boards")
      .exec(async (err, workspaceData) => {
        if (err) {
          return res.status(500).json({
            errors: { common: { msg: err } },
          });
        }
        const workspace = workspaceData[0];
        const boardList = workspace.boards;
        const boardIds = boardList.map((board) => board._id.toString());
        const taskData = await Kanban.find({ isDelete: false });
        const taskList = taskData.filter((task) => boardIds.indexOf(task.boardId.toString()) > -1);
        return res.status(201).json({
          boards: boardList,
          tasks: taskList,
        });
      });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.getCollabrators = async (req, res) => {
  try {
    return res.status(201).json({
      success: "Collabrator successfull",
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.shareWorkspace = async (req, res) => {
  try {
    return res.status(201).json({
      success: "Share successfull",
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.updateWorkspace = async (req, res) => {
  try {
    const { id, title, collabrators } = req.body;
    const workspace = await Workspace.find({ _id: id });
    if (!workspace) {
      return res.status(404).json({
        errors: { common: { msg: `No workspace data found by id: ${id}` } },
      });
    }
    workspaceData = workspace[0];
    workspaceData.title = title ? title : workspaceData.title;
    workspaceData.collabrators = collabrators.length ? collabrators : workspaceData.collabrators;
    workspaceData.save((err, success) => {
      if (err) {
        if (err) {
          return res.status(500).json({
            errors: { common: { msg: err } },
          });
        }
      }
      return res.status(201).json({
        success: "Workspace updated successfull",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.deleteWorkspace = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteWorkspace = await Workspace.updateOne({ _id: _id }, { isDelete: true });
    if (deleteWorkspace.modifiedCount >= 1) {
      return res.send({ msg: "The task workspace deleted successfully", success: true });
    }
    return res.send({ msg: "not deleted", success: false });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};
