const mongoose = require("mongoose");
const schema = mongoose.Schema;

const progression = new schema(
  {
    progressionName: {
      type: String,
      require: true,
    },
    progressionType: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    categoryId: [
      {
        type: schema.Types.ObjectId,
        ref: "category",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("progression", progression);
