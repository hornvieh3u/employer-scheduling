const mongoose = require("mongoose");
var schema = mongoose.Schema;
var voiceRecordingSchema = new schema(
  {
    recording_url: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    num: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("voiceRecord", voiceRecordingSchema);
