const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrganizationLocation = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    organizationId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "organization",
    },
    path: {
      type: String,
      unique: true,
      match: [
        /^[A-Z_-]*$/i,
        "Incorrect path format, only alphanumeric and `-` & `_` allowed as special characters",
      ],
    },
    address: {
      type: String,
    },
    email: {
      type: String,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/, "Please provide valid email"],
    },
    contact: {
      type: String,
    },
    admin: {
      type: mongoose.Types.ObjectId,
      ref: "Auth",
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model("organization-location", OrganizationLocation);
