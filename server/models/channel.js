const mongoose = require("mongoose");

const ChannelSchema = mongoose.Schema({
  machineId: {
    type: String,
    required: true,
  },
  adminId: {
    type: String,
    required: true,
  },
  activated: {
    type: Boolean,
    required: true,
    default: true,
  },
  contactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LivechatContact",
  },
  locationInfo: {
    // This is location info in JSON type
    type: String,
    required: true,
  },
  browserInfo: {
    type: String,
    required: true,
  },
  messages: [
    {
      // Enum type : ["Pre chat form", "clientMessage", "adminMessage", "post chat form"]
      // Prechatform : { username, email }
      // Postchatform: { questions: ..., rate: ...}\
      type: new mongoose.Schema(
        {
          type: {
            type: String,
            required: true,
          },
          msg: {
            type: String, // Will be JSON.stringify for prepost and sufpost
            required: false,
          },
        },
        { timestamps: true }
      ),
    },
  ],
});

module.exports = mongoose.model("Channel", ChannelSchema);
