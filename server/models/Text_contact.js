const mongoose = require("mongoose");
const schema = mongoose.Schema;

const TextContactSchema = schema(
  {
    uid: {
      type: String,
      require: true,
      unique: true,
      index: true,
    },
    from: {
      type: String,
      require: true,
    },
    isSeen: {
      type: Boolean,
      default: false,
      index: true,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    twilio: {
      type: String,
      unique: true,
      index: true,
    },
    textCredit: {
      type: Number,
    },
    primaryPhone: {
      type: String,
      unique: true,
      index: true,
    },
    time: {
      type: Date,
      default: Date.now(),
    },
    timeZone: {
      type: String,
    },
    textContent: { type: String },
    textMessage: { type: String },
    clientContact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "client-contact",
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("text_contact", TextContactSchema);
