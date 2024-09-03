const { SmartList } = require("../models/index/index");

exports.createSmartList = (req, res) => {
  const smartList = req.body;
  smartList.userId = req.user._id;
  const newSmartList = new SmartList(smartList);
  newSmartList.save((err, data) => {
    if (err) {
      return res.send({ msg: err.message, success: false });
    }
    return res.send({ msg: "SmartList created successfully", success: true, data });
  });
};

exports.getSmartList = (req, res) => {
  const userId = req.user._id;
  SmartList.find({ userId })
    .then((data) => {
      res.send({ data, success: true });
    })
    .catch((err) => {
      res.send({ msg: err.message, success: false });
    });
};
