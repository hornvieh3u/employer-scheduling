const mongoose = require("mongoose");

const schema = mongoose.Schema;

const documentSubfolderSchema = new mongoose.Schema({
  subfolderName: {
    type: String,
    require: true,
    unique: true,
  },
  document: [
    {
      type: schema.Types.ObjectId,
      ref: "document",
    },
  ],
  folderId: {
    type: String,
  },
  userId: {
    type: String,
    index: true,
  },
});

module.exports = mongoose.model("document-subfolder", documentSubfolderSchema);
