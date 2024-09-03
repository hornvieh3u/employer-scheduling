const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
    required: true,
  },
  fullName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
    default: "",
  },
  photo: {
    type: String,
    trim: true,
    default: "",
  },
  gender: {
    type: String,
    enum: ["male", "female", "others", ""],
    default: "",
  },
  address: {
    zipCode: String,
    state: String,
    street: String,
    city: String,
    country: String,
  },
  socialLinks: [
    {
      name: String,
      link: String,
    },
  ],
  status: {
    type: String,
    enum: ["pending", "active", "inactive"],
    default: "active",
  },
  note: {
    type: String,
    trim: true,
    default: "",
  },
  tags: [],
  dob: { type: Date },
  type: {
    type: String,
    enum: ["edition", "admin", "subscriber", "none"],
    default: "none",
  },
  ranks: [
    {
      name: {
        type: String,
        required: true,
      },
      photo: String,
      createdAt: Date,
    },
  ],
  salary: { type: Number, default: 0 },
  isFormer: { type: Boolean, default: false },
  isinternship: { type: Boolean, default: false },
  isDelete: { type: Boolean, default: false },
});

module.exports = mongoose.model("employee", employeeSchema);
