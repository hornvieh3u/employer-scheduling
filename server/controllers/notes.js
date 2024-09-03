const { Notes, User } = require("../models/index/index");
const mongoose = require("mongoose");

exports.createNote = async (req, res) => {
  let userData = req.user;
  let payload = req.body;
  let createNotePayload = payload;
  try {
    createNotePayload.firstName = userData.firstName;
    createNotePayload.lastName = userData.lastName;
    createNotePayload.userId = mongoose.Types.ObjectId(userData._id);
    createNotePayload.time = new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    let createdNote = await Notes.create(createNotePayload);
    if (createdNote) {
      res.send({
        success: true,
        msg: "note created successfully",
      });
    } else {
      res.send({
        success: false,
        msg: "Error while creating the note",
      });
    }
  } catch (err) {
    res.send({ error: err.message.replace(/"/g, ""), success: false });
  }
};

exports.getNotesByUserId = async (req, res) => {
  var userId = req.user._id;
  try {
    let filter = {
      userId: userId,
      isDeleted: false,
    };
    let notes = await Notes.find(filter);
    if (!notes) {
      res.send({
        success: true,
        msg: "Data not exists for this query!!",
      });
    }
    res.send({
      success: true,
      data: notes,
    });
  } catch (error) {
    res.send({ message: error.message.replace(/"/g, ""), success: false });
  }
};

exports.updateNote = async (req, res) => {
  let userData = req.user;
  let payload = req.body;
  let noteId = req.params.noteId;
  let updateNotePayload = payload;
  try {
    updateNotePayload.firstName = userData.firstName;
    updateNotePayload.lastName = userData.lastName;
    updateNotePayload.userId = mongoose.Types.ObjectId(userData._id);
    updateNotePayload.time = new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    let updateNote = await Notes.updateOne(
      { _id: noteId, userId: userData._id },
      { $set: updateNotePayload }
    );
    if (updateNote.modifiedCount > 0) {
      res.send({
        success: true,
        msg: "note updated successfully",
      });
    } else {
      res.send({
        success: false,
        msg: "Error while updating the note",
      });
    }
  } catch (err) {
    res.send({ message: err.message.replace(/"/g, ""), success: false });
  }
};

exports.removeNote = async (req, res) => {
  let userId = req.user._id;
  let noteId = req.params.noteId;
  try {
    let removeNote = await Notes.updateOne({ _id: noteId, userId: userId }, { isDeleted: true });
    if (removeNote.modifiedCount > 0) {
      return res.send({ msg: "note remove successfully", success: true });
    }
    return res.send({ msg: "note not able to remove", success: false });
  } catch (error) {
    res.send({ message: error.message.replace(/"/g, ""), success: false });
  }
};
