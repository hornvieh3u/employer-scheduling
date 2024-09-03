const mongoose = require("mongoose");

const vendorContact = new mongoose.Schema({
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
    zipCode: String,
    state: String,
    street: String,
    city: String,
    country: String,
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
  company: {
    type: String,
    default: "",
  },
  companyPhone: { type: String, default: "" },
  companyEmail: { type: String, default: "" },
  companyAddress: {
    zipCode: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    street: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
  },

  type: {
    type: String,
    default: "personal",
    // enum: ["personal", "business", "other"],
  },
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
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    taxId: {
      type: String,
      default: "",
    },
    vatNo: {
      type: String,
      default: "",
    },
    addressLineOne: {
      type: String,
      default: "",
    },
    addressLineTwo: {
      type: String,
      default: "",
    },
    zipCode: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    street: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
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

  isDelete: { type: Boolean, default: false },
});

module.exports = mongoose.model("vendor-contacts", vendorContact);
