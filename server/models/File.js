const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  type: {
    type: String, // Enum type : "Doc", "Pdf", "Folder"
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  lastSeen: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("File", FileSchema);
