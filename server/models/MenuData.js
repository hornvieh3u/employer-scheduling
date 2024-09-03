const mongoose = require("mongoose");

const menuDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
    required: true,
  },
  id: String,
  isMainMenu: Boolean,
  mainMenuId: String,
  title: String,
  icon: String,
  navLink: String,
});

module.exports = mongoose.model("menu-data", menuDataSchema);
