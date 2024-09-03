const { Membership, Shop } = require("../models/index/index");
const { default: mongoose } = require("mongoose");

exports.create = async (req, res) => {
  const membershipDetails = req.body;
  const shopId = req.params.shopId;
  const userId = req.user._id;
  try {
    membershipDetails.userId = userId;
    const membershipObj = new Membership(membershipDetails);
    await membershipObj.save(async (err, data) => {
      if (err) {
        return res.send({ msg: err.message, success: false });
      } else if (data) {
        Shop.find({ userId: mongoose.Types.ObjectId(_id) }).exec(
          async (err, result) => {
            if (err) {
              res.send({ msg: "shop not found", success: false })
            }
            else {
              if (!result.length) {
                let shopObj = new Shop();
                shopObj.userId = mongoose.Types.ObjectId(_id);
                shopObj.memberships.push(mongoose.Types.ObjectId(data._id));
                await shopObj.save(async (error, response) => {
                  if (error) {
                    res.send({ msg: error.message, success: false });
                  }
                  else {
                    res.send({
                      msg: "membership created successfully",
                      success: true,
                    });
                  }
                })
              }
              else {
                let temp = await Shop.updateOne(
                  { userId: mongoose.Types.ObjectId(_id) },
                  { $push: { memberships: data._id } }
                );
                if (temp.modifiedCount > 0) {
                  res.send({
                    msg: "membership created successfully",
                    success: true,
                  });
                } else {
                  res.send({ msg: "membership not created", success: false });
                }
              }
            }
          }
        )
      }
    });
  } catch (error) {
    res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    let id = req.params.membershipId;
    Membership.updateOne({ _id: id }, { $set: { isfavorite: 1 } }).exec(
      async (err, data) => {
        if (err) {
          res.send({
            msg: err,
            success: false,
          });
        } else {
          if (data.modifiedCount > 0) {
            return res.send({
              msg: "membership updated succesfully",
              success: true,
            });
          }
        }
      }
    );
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    let id = req.params.membershipId;
    Membership.updateOne({ _id: id }, { $set: { isfavorite: 0 } }).exec(
      async (err, data) => {
        if (err) {
          res.send({
            msg: err,
            success: false,
          });
        } else {
          if (data.modifiedCount > 0) {
            return res.send({
              msg: "membership updated succesfully",
              success: true,
            });
          }
        }
      }
    );
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.membershipInfo = (req, res) => {
  const membershipId = req.params.membershipId;
  try {
    Membership.find({ _id: mongoose.Types.ObjectId(membershipId), isDeleted: false }).exec(
      (err, data) => {
        if (err) {
          return res.send({ msg: "membership  not found", success: false });
        } else {
          return res.send({ data, success: true });
        }
      }
    );
  } catch (error) {
    res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
};

exports.membershipList = async (req, res) => {
  try {
    const { _id } = req.user;
    const perPage = req.query.perPage;
    const sortBy = req.query.sortBy;
    const page = req.query.page;
    const q = req.query.q;
    let sort_q;
    if (sortBy === 'featured') {
      sort_q = {
        isfavorite: -1
      }
    }
    else if (sortBy === 'price-asc') {
      sort_q = {
        total_price: 1
      }
    }
    else {
      sort_q = {
        total_price: -1
      };
    };
    const total = await Membership.find({ "membership_name": { $regex: q }, userId: mongoose.Types.ObjectId(_id) }).count();
    Membership.find({ "membership_name": { $regex: q }, userId: mongoose.Types.ObjectId(_id) })
      .skip((page) * perPage)
      .limit(perPage)
      .sort(sort_q)
      .exec(
        (err, data) => {
          if (err) {
            res.send({
              msg: err,
              success: false,
            });
          }
          else {
            res.send({ data, success: true, total });
          }
        }
      )
  }
  catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
}

exports.membershipUpdate = async (req, res) => {
  const membershipData = req.body;
  const membershipId = req.params.membershipId;
  try {
    const membershipData = req.body;
    const membershipId = req.params.membershipId;
    Membership.updateOne({ _id: membershipId }, { $set: membershipData }).exec(
      async (err, data) => {
        if (err) {
          return res.send({
            msg: err,
            success: false,
          });
        } else {
          if (data.modifiedCount > 0) {
            return res.send({
              msg: "membership updated succesfully",
              success: false,
            });
          }
        }
      }
    );
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.remove = async (req, res) => {
  const id = req.params.Id;
  try {
    let delete_membership = await Membership.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      { $set: { isDeleted: true } }
    );
    if (delete_membership.modifiedCount > 0) {
      return res.send({ msg: "membership deleted successfully", success: true });
    } else {
      return res.send({ msg: "membership not deleted", success: false });
    }
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};
