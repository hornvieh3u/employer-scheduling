const { Program } = require("../models/index/index");
const { default: mongoose } = require("mongoose");
const googleCloudStorage = require("../Utilities/googleCloudStorage");

exports.create = async (req, res) => {
  try {
    const programBody = req.body;
    let url = await googleCloudStorage.upload(req.file);
    programBody.program_image = url;
    programBody.userId = req.params.userId;
    let isExist = await Program.find({ programName: programBody.programName });
    if (!isExist.length) {
      var prog = new Program(programBody);
      prog.save((err, data) => {
        if (err) {
          res.send({ msg: "program not created", success: false });
        } else {
          res.send({ msg: "Program created successfully ", success: true });
        }
      });
    } else {
      res.send({ msg: "Program alredy exist!", success: false });
    }
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.read = (req, res) => {
  const userId = req.params.userId;
  try {
    Program.find({ userId: userId, isDeleted: false }).exec((err, programdata) => {
      if (err) {
        res.send({ error: "program is not found" });
      } else {
        res.send({ data: programdata, success: true });
      }
    });
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.programs_detail = (req, res) => {
  var id = req.params.proId;
  Program.find({ _id: id, isDeleted: false }).exec((err, data) => {
    if (err) {
      res.send({ error: "programe id not found" });
    } else {
      res.send(data);
    }
  });
};

exports.update = async (req, res) => {
  const programBody = req.body;
  const programId = req.params.proId;
  try {
    let isExist = await Program.find({ programName: programBody.programName });
    let url = await googleCloudStorage.upload(req.file);
    programBody.program_image = url;
    if (isExist.length) {
      Program.updateOne({ _id: programId }, { $set: programBody }).exec(async (err, updateData) => {
        if (err) {
          res.send({ msg: err, success: false });
        } else {
          if (updateData.modifiedCount < 1) {
            res.send({
              msg: "unable to update program",
              success: false,
            });
          }
          res.send({ msg: "programm updated succesfully", success: true });
        }
      });
    } else {
      res.send({ msg: "Program is not  exist!", success: false });
    }
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.remove = async (req, res) => {
  const programId = req.params.proId;
  try {
    let result = await Program.updateOne({ _id: programId }, { isDeleted: true });
    if (result.modifiedCount < 1) {
      res.send({
        msg: "unable to delete program",
        success: false,
      });
    } else {
      res.send({ msg: "programm deleted succesfully", success: true });
    }
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};
