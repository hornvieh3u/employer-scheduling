/* eslint-disable consistent-return */
const { default: mongoose } = require("mongoose");
const { CandidateStripe, Candidate } = require("../models/index/index");
const GoogleCloudStorage = require("../Utilities/googleCloudStorage");

exports.create_stripe = async (req, res) => {
  try {
    const candidate = req.body.candidate ? req.body.candidate : "";
    const isExist = await Candidate.find({
      candidate,
    });
    let url;
    if (isExist) {
      url = await GoogleCloudStorage.upload(req.file);
    }
    const stripeName = req.body.stripe_name ? req.body.stripe_name : "";
    const stripeOrder = req.body.stripe_order ? req.body.stripe_order : "";
    const stripeImage = url || "";
    const userId = req.params.userId ? req.params.userId : "";
    const payload = {
      candidate,
      stripe_name: stripeName,
      stripe_order: stripeOrder,
      stripe_image: stripeImage,
      userId,
    };
    const candidateStripeObj = new CandidateStripe(payload);
    await candidateStripeObj.save(async (err, data) => {
      if (err) {
        return res.status(500).json({
          errors: { common: { msg: err.message } },
        });
      }
      const candidateUpdate = await Candidate.updateOne(
        { candidate },
        { $push: { stripes: data._id } }
      );
      if (candidateUpdate.modifiedCount < 1) {
        return res.send({
          msg: "unable to create  candidate_stripe",
          success: false,
        });
      }
      res.send({
        msg: "candidate_stripe created successfully",
        success: true,
      });
    });
  } catch (err) {
    res.send({ error: err.message.replace(/"/g, ""), success: false });
  }
};

exports.candidate_stripe_update = async (req, res) => {
  try {
    const url = await GoogleCloudStorage.upload(req.file);
    const { stripeId } = req.params;
    const candidate = req.body.candidate ? req.body.candidate : "";
    const stripeName = req.body.stripe_name ? req.body.stripe_name : "";
    const stripeOrder = req.body.stripe_order ? req.body.stripe_order : "";
    const stripeImage = url || "";
    const userId = req.params.userId ? req.params.userId : "";
    const payload = {
      candidate,
      stripe_name: stripeName,
      stripe_order: stripeOrder,
      stripe_image: stripeImage,
      userId,
    };
    const stripeUpdate = await CandidateStripe.updateOne(
      { _id: stripeId, userId },
      { $set: payload }
    );
    if (stripeUpdate.modifiedCount < 1) {
      return res.send({
        msg: "unable to update candidate_stripe",
        success: false,
      });
    }
    res.send({
      msg: "candidate_stripe updated successfully",
      success: true,
    });
  } catch (err) {
    res.send({ error: err.message.replace(/"/g, ""), success: false });
  }
};

exports.candidate_stripe_detail = async (req, res) => {
  try {
    const { stripeId } = req.params;
    const { userId } = req.params;
    const candidateStripeData = await CandidateStripe.find({ _id: stripeId, userId });
    if (candidateStripeData.length > 0) {
      res.send({ data: candidateStripeData, success: true });
    } else {
      res.send({ msg: "candidate_stripe_detail is empty", success: false });
    }
  } catch (err) {
    res.send({ error: err.message.replace(/"/g, ""), success: false });
  }
};

// eslint-disable-next-line consistent-return
exports.candidate_stripe_remove = async (req, res) => {
  const { stripeId } = req.params;
  const { userId } = req.params;
  const data = await CandidateStripe.updateOne(
    { _id: mongoose.Types.ObjectId(stripeId), userId },
    { isDeleted: true }
  );
  if (data.modifiedCount < 1) {
    return res.send({
      msg: "unable to delete candidate_stripe",
      success: false,
    });
  }
  res.send({
    msg: "candidate_stripe deleted successfully",
    success: true,
  });
};
