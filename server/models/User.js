const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  organizationId: {
    type: mongoose.Types.ObjectId,
    ref: "organization",
  },
  gender: {
    type: String,
    enum: ["male", "female", "others", ""],
    default: "",
  },
  dob: { type: Date },
  accType: {
    type: String,
    enum: ["personal", "business"],
    default: "personal",
  },
  businessType: { type: String, trim: true, default: "" },
  packageId: { type: String, default: "" },
  address: {
    zipCode: String,
    state: String,
    street: String,
    city: String,
    country: String,
  },
  company: {
    type: String,
    default: "",
  },
  phone_number: {
    type: String,
    default: "",
  },
  position: { type: String, default: "" },
  isActive: { type: Boolean, default: true },
  location: {
    type: Array,
    value: [locationSchema],
  },
});

module.exports = mongoose.model("users", userSchema);
