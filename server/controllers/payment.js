require("dotenv").config();
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { StripeCustomer } = require("../models/index/index");

exports.createStripeCustomer = asyncHandler(async (req, res) => {
  try {
    const payload = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || "",
    };
    const customerExistsInDB = await StripeCustomer.findOne({ email: req.body.email });
    if (customerExistsInDB) {
      // const customerExists = await stripe.customers.retrieve(customerExistsInDB.customerId);
      // return res.status(200).json({ ...customerExists, isExisting: true });
      return res.status(200).json({ ...customerExistsInDB.toObject(), isExisting: true });
    }
    const customer = await stripe.customers.create(payload);
    const customerInDB = await StripeCustomer.create({
      customerId: customer.id,
      userId: mongoose.Types.ObjectId(req.params.userId),
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
    });
    return res.status(200).json({ ...customerInDB.toObject(), isExisting: false });
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.createStripePaymentIntent = asyncHandler(async (req, res) => {
  const {
    cardExpYear, cardExpMonth, cardNumber, cardCvc, amount, currency
  } = req.body;
  try {
    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: cardNumber,
        exp_month: cardExpMonth,
        exp_year: cardExpYear,
        cvc: cardCvc,
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount,
      currency,
      // could be dynamically sent from client and intent can still be created and updated later
      confirm: true,
      payment_method_types: ["card"],
    });
    return res.status(201).send(paymentIntent);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getStripePaymentIntent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(id);
    return res.send(200).send(paymentIntent);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.updateStripePaymentIntent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.update(id, payload);
    return res.send(200).send(paymentIntent);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

// Alternatives for payment intent
exports.createStripeCard = asyncHandler(async (req, res) => {
  const {
    customerId, cardName, cardExpYear, cardExpMonth, cardNumber, cardCvc
  } = req.body;
  try {
    const cardToken = await stripe.tokens.create({
      card: {
        name: cardName,
        number: cardNumber,
        exp_month: cardExpMonth,
        exp_year: cardExpYear,
        cvc: cardCvc,
      },
    });
    const card = await stripe.customers.createSource(customerId, { source: `${cardToken.id}` });
    return res.status(200).json({ card: card.id });
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.createStripeCharge = asyncHandler(async (req, res) => {
  const {
    customerId, customerEmail, amount, currency, description, addresss, cardId
  } = req.body;
  try {
    const charge = await stripe.charges.create({
      receipt_email: customerEmail,
      amount,
      currency,
      card: cardId,
      customer: customerId,
      description,
      addresss,
    });
    console.log(charge);
    return res.status(200).json(charge);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});
