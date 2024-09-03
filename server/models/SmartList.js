const mongoose = require("mongoose");
const schema = mongoose.Schema;


const SmartListSchema = new schema(
  {
    userId: {
      type: String,
      index: true,
    },
    name: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("smartListGroup", SmartListSchema);
