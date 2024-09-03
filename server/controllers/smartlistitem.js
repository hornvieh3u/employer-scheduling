const { SmartListItem } = require("../models/index/index");

exports.createSmartListItem = (req, res) => {
  const smartListItem = req.body;
  smartListItem.userId = req.user._id;
  const newSmartListItem = new SmartListItem(smartListItem);
  newSmartListItem.save((err, data) => {
    if (err) {
      return res.send({ msg: err.message, success: false });
    }
    return res.send({ msg: "SmartListItem created successfully", success: true, data });
  });
};

exports.getSmartListItem = (req, res) => {
  const userId = req.user._id;
  const { listId } = req.params;
  SmartListItem.find({ userId, listId: listId, isDeleted: false })
    .then((data) => {
      res.send({ data, success: true });
    })
    .catch((err) => {
      res.send({ msg: err.message, success: false });
    });
};

exports.deleteSmartListItem = (req, res) => {
    const itemId = req.params.itemId;
    SmartListItem.findByIdAndUpdate(itemId, { $set: { isDeleted: true } })
    .then(() => {
        res.send({ msg: "Item deleted successfully", success: true });
    })
    .catch((err) => {
        res.send({ msg: err.message, success: false });
    });
};

exports.updateSmartListItem = (req, res) => {
    const itemData = req.body;
    const itemId = req.params.itemId;
    SmartListItem.findByIdAndUpdate(itemId, {
      ...itemData,
    })
      .then(() => {
        res.send({ msg: "item updated successfuly", success: true });
      })
      .catch(() => {
        res.send({ msg: "booking not updated!", success: false });
      });
  };
