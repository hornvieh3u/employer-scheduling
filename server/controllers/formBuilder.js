// model
const FormBuilder = require("../models/formBuilder");

/**
 *
 * @desc Create formBuilder Controller
 * @route POST /api/formBuilder/create
 * @returns 201: {msg: "success", data:{}}, 500  {errors: { common: { msg: err.message } }},
 */
// eslint-disable-next-line consistent-return
exports.createForm = async (req, res) => {
  try {
    const newformBuilder = new FormBuilder({ ...req.body });
    newformBuilder.save((err, result) => {
      res.status(201).json({
        msg: "form successfully created",
        data: result,
      });
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.getForms = async (req, res) => {
  const { id } = req.body;
  try {
    const forms = await FormBuilder.find({ id });

    res.status(200).json({
      data: forms,
      // formsMeta: {
      //   open: openCount,
      //   pending: pendingTicketCount,
      //   spam: spamTicketCount,
      //   completed: closedTicketCount,
      // },
    });
  } catch (err) {
    res.send({ msg: "error" });
  }
};

exports.deleteForm = async (req, res) => {
  const { formId } = req.body;
  try {
    await FormBuilder.findByIdAndDelete(formId);
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
};
