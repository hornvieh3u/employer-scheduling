const { Program, ProgramRank } = require("../models/index/index");
const googleCloudStorage = require("../Utilities/googleCloudStorage");

exports.create = async (req, res) => {
  const rankBody = req.body;
  rankBody.userId = req.params.userId;
  const isExist = await Program.find({ programName: rankBody.programName });
  try {
    if (isExist.length) {
      if (req.file) {
        const url = await googleCloudStorage.upload(req.file);
        rankBody.rank_image = url;
      }
      const prog = new ProgramRank(rankBody);
      prog.save((err, data) => {
        if (err) {
          res.send({ msg: err, success: false });
        } else {
          Program.updateOne(
            { programName: req.body.programName },
            { $push: { program_rank: data._id } }
            // eslint-disable-next-line no-shadow
          ).exec((err, programdata) => {
            if (programdata.modifiedCount > 0) {
              res.send({ msg: "rank added successfully", success: true });
            } else {
              res.send({ msg: "rank not added", success: false });
            }
          });
        }
      });
    } else {
      res.send({ msg: `programName is not exist`, success: false });
    }
  } catch (err) {
    res.send({ msg: err.message.replace(/"/g, ""), success: false });
  }
};

exports.programInfo = async (req, res) => {
  try {
    const id = req.params.program_rank_id;
    ProgramRank.find({ _id: id, isDeleted: false })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (err) {
    res.send({ msg: err.message.replace(/"/g, ""), success: false });
  }
};

exports.update = async (req, res) => {
  const rankBody = req.body;
  const rankId = req.params.program_rank_id;
  rankBody.userId = req.params.userId;
  const isExist = await Program.find({ programName: rankBody.programName });
  try {
    if (isExist.length) {
      if (req.file) {
        const url = await googleCloudStorage.upload(req.file);
        rankBody.rank_image = url;
      }
      ProgramRank.updateOne({ _id: rankId }, { $set: rankBody }).exec((err, programdata) => {
        if (programdata.modifiedCount > 0) {
          res.send({ msg: "rank updated successfully", success: true });
        } else {
          res.send({ msg: "rank not update", success: false });
        }
      });
    } else {
      res.send({ msg: `programName is not exist`, success: false });
    }
  } catch (err) {
    res.send({ msg: err.message.replace(/"/g, ""), success: false });
  }
};

exports.remove = async (req, res) => {
  const rankId = req.params.program_rank_id;
  try {
    const result = await ProgramRank.updateOne({ _id: rankId }, { isDeleted: true });
    if (result.modifiedCount < 1) {
      res.send({
        msg: "unable to delete program_rank",
        success: false,
      });
    } else {
      res.send({ msg: "program_rank deleted succesfully", success: true });
    }
  } catch (err) {
    res.send({ msg: err.message.replace(/"/g, ""), success: false });
  }
};
