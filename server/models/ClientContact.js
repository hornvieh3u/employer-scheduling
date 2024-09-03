const mongoose = require("mongoose");

const clientContactSchema = new mongoose.Schema({
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
  email: { type: String, default: "" },
  phone: { type: String, default: "" },
  photo: { type: String, default: "" },
  gender: {
    type: String,
    enum: ["male", "female", "transgender", ""],
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  socialLinks: [
    {
      logo: String,
      name: String,
      link: String,
    },
  ],
  status: {
    type: String,
    enum: ["active", "inactive", "pending"],
    default: "active",
  },
  note: {
    type: String,
    default: "",
  },
  dob: {
    type: Date,
  },
  tags: {
    type: Array,
    default: [],
  },
  companyPhone: {
    type: String,
    default: "",
  },
  companyEmail: {
    type: String,
    default: "",
  },
  companyAddress: {
    zipCode: String,
    state: String,
    street: String,
    city: String,
    country: String,
  },
  type: {
    type: String,
    enum: ["individual", "company", "n/a"],
    default: "n/a",
  },
  company: { type: String, default: "" },
  position: {
    type: String,
    // enum: ["owner", "assitant", "billing", "n/a"],
    // enum is not ok here because it can be other Position like Manager, Secretary etc
    default: "n/a",
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

  // ** files
  files: [
    {
      title: {
        type: String,
        required: true,
      },
      file: String,
      createdAt: Date,
    },
  ],

  //
  others: [
    {
      address: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      startDate: { type: Date, default: Date.now() },
      endDate: Date,
      file: String,
    },
  ],

  // Billing Address
  billingAddress: {
    firstName: String,
    lastName: String,
    country: String,
    addressLineOne: String,
    addressLineTwo: String,
    town: String,
    zipCode: String,
    state: String,
  },
  paymentMethods: [
    {
      cardType: String, // visa, mastercard,
      isPrimary: {
        type: Boolean,
        default: false,
      },
      cardHolder: String,
      cardNumber: {
        type: String,
        maxlength: 16,
      },
      expiryDate: {
        type: String,
      },
      cvv: {
        type: String,
      },
    },
  ],

  isFormer: { type: Boolean, default: false },
  isDelete: { type: Boolean, default: false },
});

module.exports = mongoose.model("client-contact", clientContactSchema);
