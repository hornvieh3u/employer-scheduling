const { Label } = require("../models/index/index");

const initialLabels = {
  App: "info",
  UX: "success",
  Images: "warning",
  Forms: "success",
  "Code Review": "danger",
  "Charts & Maps": "primary",
};

exports.newLabel = async (req, res) => {
  try {
    const { title, color } = req.body;
    const initialLabel = new Label({
      title: title,
      color: color,
    });

    initialLabel.save((err, success) => {
      if (err) {
        return res.status(500).json({
          errors: { common: { msg: err.message } },
        });
      } else {
        return res.status(200).json({
          success,
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.getLabel = async (req, res) => {
  try {
    const labelList = await Label.find({
      isDelete: false,
    });

    if (labelList.length > 0) {
      return res.status(200).send(labelList);
    } else {
      let labelData = [];

      for (key in initialLabels) {
        const initialLabel = new Label({
          title: key,
          color: initialLabels[key],
        });

        initialLabel.save((err, success) => {
          if (err) {
            return res.status(500).json({
              errors: { common: { msg: err.message } },
            });
          }
        });
        labelData.push(initialLabel);
      }
      console.log(labelData);
      return res.status(200).send(labelData);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err } },
    });
  }
};

exports.updateLabel = async (req, res) => {
  try {
    console.log(req.body);
    const { _id, title, color } = req.body;

    const labelData = await Label.find({ _id: _id });
    if (!labelData.length) {
      return res.status(404).json({
        errors: { common: { msg: `No Label data found by id: ${_id}` } },
      });
    }
    const label = labelData[0];
    console.log(label);
    label.title = title ? title : label.title;
    label.color = color ? color : label.color;

    label.save((err, success) => {
      if (err) {
        return res.status(500).json({
          errors: { common: { msg: err.message } },
        });
      } else {
        return res.status(200).json({
          success,
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.deleteLabel = async (req, res) => {
  try {
    const { _id } = req.params;

    await Label.updateMany(
      {
        _id: _id,
      },
      {
        isDelete: true,
      }
    );
    return res.status(200).json({
      msg: {
        comment: "succcessfully deleted",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};
