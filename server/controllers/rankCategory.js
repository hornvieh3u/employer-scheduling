const { Category, RankCategory } = require("../models/index/index");
const googleCloudStorage = require("../Utilities/googleCloudStorage");
const mongoose = require("mongoose");

exports.create = async (req, res) => {
  const rankBody = req.body;
  const categoryId = req.params.categoryId;
  rankBody.userId = req.user._id;
  rankBody.categoryId = categoryId;
  const isExist = await Category.find({ _id: categoryId, isDeleted: false });
  try {
    if (isExist.length) {
      if (req.file) {
        const url = await googleCloudStorage.upload(req.file);
        rankBody.rankImage = url;
      }
      const rank = new RankCategory(rankBody);
      rank.save((err, data) => {
        if (err) {
          return res.send({ msg: err, success: false });
        }
        return res.send({ msg: "Categoy rank created successfully", success: true });
      });
    } else {
      return res.send({ msg: `category is not exist`, success: false });
    }
  } catch (err) {
    return res.send({ msg: err.message.replace(/"/g, ""), success: false });
  }
};

exports.rankCategoryInfo = async (req, res) => {
  const userId = req.user._id;
  const categoryId = req.params.categoryId;
  try {
    RankCategory.find({ userId: userId, isDeleted: false, categoryId: categoryId })
      .then((result) => {
        res.json({
          data: result,
          success: true,
        });
      })
      .catch((err) => {
        return res.send(err);
      });
  } catch (err) {
    return res.send({ msg: err.message.replace(/"/g, ""), success: false });
  }
};

exports.update = async (req, res) => {
  const rankBody = req.body;
  const rankId = req.params.category_rank_id;
  try {
    if (req.file) {
      const url = await googleCloudStorage.upload(req.file);
      rankBody.rankImage = url;
    }
    RankCategory.updateOne({ _id: rankId }, { $set: rankBody }).exec((err, programdata) => {
      if (programdata.modifiedCount > 0) {
        return res.send({ msg: "rank updated successfully", success: true });
      } else {
        return res.send({ msg: "rank not update", success: false });
      }
    });
  } catch (err) {
    return res.send({ msg: err.message.replace(/"/g, ""), success: false });
  }
};

exports.remove = async (req, res) => {
  const rankId = req.params.category_rank_id;
  try {
    const result = await RankCategory.updateOne(
      { _id: mongoose.Types.ObjectId(rankId) },
      { isDeleted: true }
    );
    if (result.modifiedCount < 1) {
      return res.send({
        msg: "unable to delete rankCategory",
        success: false,
      });
    } else {
      return res.send({ msg: "rankCategory deleted succesfully", success: true });
    }
  } catch (err) {
    return res.send({ msg: err.message.replace(/"/g, ""), success: false });
  }
};
