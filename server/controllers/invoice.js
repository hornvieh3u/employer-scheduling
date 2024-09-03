const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { Invoice } = require("../models/index/index");

exports.createInvoice = asyncHandler(async (req, res) => {
  try {
    let { _id: userId } = req.user;
    userId = mongoose.Types.ObjectId(userId);
    const tax = req.body.tax || 0;
    const discount = req.body.discount || 0;

    const lastInvoice = await Invoice.findOne({}, {}, { sort: { createdAt: -1 } });
    let no = 0;
    if (lastInvoice) {
      no = (Number(lastInvoice.no) + 1).toString();
    }
    const subTotal = req.body.items.reduce((total, item) => total + item.quantity * item.rate, 0);
    let totalAmount = subTotal - subTotal * discount;
    totalAmount += subTotal * tax;
    const payload = {
      userId,
      no,
      totalAmount,
      ...req.body,
    };
    await Invoice.create(payload);
    return res.status(201).send({ success: true });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getInvoices = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    let invoices = await Invoice.find({ userId: _id });
    invoices = invoices.map((i) => {
      const paidAmount = i.paidAmount || 0;
      const balance = i.totalAmount > paidAmount ? i.totalAmount - paidAmount : 0;
      return { ...i.toObject({ versionKey: false }), balance };
    });
    return res.status(200).json(invoices);
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getInvoiceById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let invoice = await Invoice.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
      {
        // $lookup: {
        //   from: "customers",
        //   localField: "customerId",
        //   foreignField: "_id",
        //   as: "customer",
        //   pipeline: [
        //     {
        //       $project: {
        //         fullName: 1,
        //         email: 1,
        //         contact: 1,
        //         address: 1,
        //       },
        //     },
        //   ],
        // },

        $lookup: {
          from: "customers",
          let: { customerId: "$customerId" },
          as: "customers",
          pipeline: [{ $project: { fullName: 1, email: 1, address: 1, contact: 1 } }],
        },
      },
    ]);
    if (invoice.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      invoice = invoice[0];
      const paidAmount = invoice.paidAmount || 0;
      const balance = invoice.totalAmount > paidAmount ? invoice.totalAmount - paidAmount : 0;
      invoice = { ...invoice, balance };
      return res.status(200).json(invoice);
    }
    return res.status(404).json({ success: false, msg: "Not found" });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.updateInvoiceById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let payload = req.body;
    const invoice = await Invoice.findOne({ _id: mongoose.Types.ObjectId(id) });
    if (invoice.totalAmount <= invoice.paidAmount) {
      payload = { ...payload, status: "PAID" };
    }
    await invoice.update(payload);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.deleteInvoiceById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    // const data = await Invoice.findByIdAndDelete(mongoose.Types.ObjectId(id));
    // if (data !== null) return res.status(200).send({ success: true, msg: "Delete invoice" });
    // return res
    //   .status(404)
    //   .json({ success: false, msg: `Invoice with id ${id} not found hence not deleted` });

    const invoice = await Invoice.findOne({ _id: mongoose.Types.ObjectId(id) });

    await invoice.update({ isDelete: true });
    return res.status(200).json({
      success: true,
      msg: "Delete invoice successfully.",
    });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});
