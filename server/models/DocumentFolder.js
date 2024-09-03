const mongoose = require("mongoose");

const { Schema } = mongoose;

const documentFolderSchema = new Schema({
  folderName: {
    type: String,
    unique: true,
    required: true,
  },
  document: [
    {
      type: Schema.Types.ObjectId,
      ref: "document",
    },
  ],
  subFolder: [
    {
      type: Schema.Types.ObjectId,
      ref: "document-subfolder",
    },
  ],
  userId: {
    type: String,
    index: true,
  },
});

module.exports = mongoose.model("document-folder", documentFolderSchema);
