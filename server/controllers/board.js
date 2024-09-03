const { Board } = require("../models/index/index");
const { Workspace } = require("../models/index/index");

exports.newTaskBoard = async (req, res) => {
  try {
    const { id, title, workspaceId } = req.body;
    const newBodyData = {
      id: id,
      title: title,
    };
    const newBoard = new Board(newBodyData);
    const workspace = await Workspace.findOne({ _id: workspaceId });
    newBoard.save((err, boardRes) => {
      if (err) {
        console.log("Error: new board additon: ", title);
        return res.status(500).json({
          errors: { common: { msg: err.message } },
        });
      } else {
        console.log("New added board id: ", boardRes._id);
        console.log(workspace.boards);
        let boardList = workspace.boards;
        boardList[boardList.length] = boardRes._id;
        workspace.boards = boardList;
        workspace.save((err, updateRes) => {
          if (err) {
            console.log("Error: update workspace's board additon: ", boardRes._id);
            return res.status(500).json({
              errors: { common: { msg: err.message } },
            });
          } else {
            console.log("Update workspace id: ", updateRes._id);
            return res.status(201).json({
              success: "Board created successfull",
            });
          }
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.getTaskBoard = async (req, res) => {
  try {
    const boardData = await Board.find({
      isDelete: false,
    });
    return res.status(200).send(boardData);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.updateTaskBoard = async (req, res) => {
  try {
    const { id, title } = req.body;
    const board = await Board.find({ _id: id });
    if (!board) {
      return res.status(404).json({
        errors: { common: { msg: "No board data found by id: ", id } },
      });
    }
    boardData = board[0];
    boardData.title = title ? title : boardData.title;
    boardData.save((err, success) => {
      if (err) {
        return res.status(500).json({
          errors: { common: { msg: err } },
        });
      }
      return res.status(201).json({
        success: "Board updated successfull",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.deleteTaskBoard = async (req, res) => {
  try {
    const { _id, workspaceId } = req.params;
    console.log(_id, workspaceId);
    const deleteBoard = await Board.updateOne({ _id: _id }, { isDelete: true });
    if (deleteBoard.modifiedCount < 1) {
      return res.send({ msg: "not deleted", success: false });
    }
    const workspace = await Workspace.findOne({ _id: workspaceId });
    let boardList = workspace.boards.filter((x) => x.toString() !== _id);
    workspace.boards = boardList;
    workspace.save((err, updateRes) => {
      if (err) {
        console.log("Error: update workspace's board deletion: ", _id);
        return res.status(500).json({
          errors: { common: { msg: err.message } },
        });
      } else {
        console.log("Update workspace id: ", updateRes._id);
        return res.status(201).json({
          success: "Board deleted successfully",
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};
