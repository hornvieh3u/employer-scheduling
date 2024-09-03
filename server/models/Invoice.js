const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    rate: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { _id: false }
);

const bankSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    iban: {
      type: String,
    },
    swift: {
      type: String,
    },
  },
  { _id: false }
);

const invoiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
      required: true,
    },
    no: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      validate: {
        // eslint-disable-next-line object-shorthand, func-names
        validator: function (value) {
          return value > this.date;
        },
        message: `Due date should be greater than invoice date`,
      },
    },
    issuedDate: {
      type: Date,
      validate: {
        // eslint-disable-next-line object-shorthand, func-names
        validator: function (value) {
          return value > this.date;
        },
        message: `issued date should be greater than invoice date`,
      },
    },
    userAddress: {
      zipCode: String,
      state: String,
      street: String,
      city: String,
      country: String,
    },
    items: {
      type: Array,
      value: [itemsSchema],
    },
    totalAmount: {
      type: Number,
    },
    discount: {
      type: Number,
      max: 1,
      min: 0,
    },
    tax: {
      type: Number,
      max: 1,
      min: 0,
    },
    paidAmount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["PAID", "PENDING"],
      default: "PENDING",
    },
    currency: {
      type: String,
      enum: ["USD"],
      default: "USD",
    },
    bank: {
      type: Object,
      value: bankSchema,
    },
    salesperson: {
      type: String,
    },
    note: {
      type: String,
    },
    isDelete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("invoice", invoiceSchema);
