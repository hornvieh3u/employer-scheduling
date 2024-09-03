const mongoose = require("mongoose");

// const fieldsSchema = new mongoose.Schema(
//   {
//     type: {
//       type: String,
//     },
//     value: {
//       type: String,
//     },
//   },
//   { _id: false }
// );

const documentCustomFieldsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      index: true,
    },
    settingsName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    fields: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("document-customfields", documentCustomFieldsSchema);
