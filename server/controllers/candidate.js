const { default: mongoose } = require("mongoose");
const { Candidate } = require("../models/index/index");
const GoogleCloudStorage = require("../Utilities/googleCloudStorage");

exports.candidate_create = async (req, res) => {
  try {
    let url = await GoogleCloudStorage.upload(req.file);
    let candidate = req.body.candidate ? req.body.candidate : "";
    let color = req.body.color ? req.body.color : "";
    let lable = req.body.lable ? req.body.lable : "";
    let total_stripe = req.body.total_stripe ? req.body.total_stripe : "";
    let progression = req.body.progression ? req.body.progression : "";
    let candidate_image = url ? url : "";
    let status = req.body.status ? req.body.status : "";
    const payload = {
      candidate: candidate,
      color: color,
      lable: lable,
      total_stripe: total_stripe,
      progression: progression,
      candidate_image: candidate_image,
      userId: req.user._id,
      status: status,
    };
    let candidateObj = new Candidate(payload);
    candidateObj.save((err, data) => {
      if (err) {
        return res.status(500).json({
          errors: { common: { msg: err.message } },
        });
      }
      res.send({ success: true, message: "candidate created successfully", data });
    });
  } catch (err) {
    res.send({ error: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.candidate_read = async (req, res) => {
  let userId = req.user._id;
  try {
    let data = await Candidate.find({ userId: userId, isDeleted: false });
    if (data.length > 0) {
      res.send({ data: data, success: true });
    } else {
      res.send({ msg: "candidate is empty", success: false });
    }
  } catch (err) {
    res.send({ error: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.candidate_update = async (req, res) => {
  let candidateId = req.params.candidateId;
  let userId = req.user._id;
  try {
    let url = await GoogleCloudStorage.upload(req.file);
    let candidate = req.body.candidate ? req.body.candidate : "";
    let color = req.body.color ? req.body.color : "";
    let lable = req.body.lable ? req.body.lable : "";
    let total_stripe = req.body.total_stripe ? req.body.total_stripe : "";
    let progression = req.body.progression ? req.body.progression : "";
    let candidate_image = url ? url : "";
    let status = req.body.status ? req.body.status : "";
    const payload = {
      candidate: candidate,
      color: color,
      lable: lable,
      total_stripe: total_stripe,
      progression: progression,
      candidate_image: candidate_image,
      userId: userId,
      status: status,
    };
    let data = await Candidate.updateOne(
      { _id: mongoose.Types.ObjectId(candidateId), userId: userId },
      { $set: payload }
    );
    if (data.modifiedCount < 1) {
      return res.send({
        msg: "unable to update candidate",
        success: false,
      });
    }
    res.send({
      msg: "candidate updated successfully",
      success: true,
    });
  } catch (err) {
    res.send({ error: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.candidate_remove = async (req, res) => {
  let candidateId = req.params.candidateId;
  let userId = req.user._id;
  let data = await Candidate.updateOne(
    { _id: mongoose.Types.ObjectId(candidateId), userId: userId },
    { isDeleted: true }
  );
  if (data.modifiedCount < 1) {
    return res.send({
      msg: "unable to delete candidate",
      success: false,
    });
  }
  res.send({
    msg: "candidate deleted successfully",
    success: true,
  });
};
