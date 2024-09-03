const Deposit = require("../models/Deposit");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.availabeNumber = (req, res) => {
  let state = req.body.value;

  client
    .availablePhoneNumbers("US")
    .local.list({ inRegion: state, limit: 20 })
    .then((local) => {
      res.json({ success: true, data: local });
    })
    .catch((err) => {
      res.json({ success: false, msg: "Something went Wrong" });
    });
};

exports.stripePayment = async (req, res) => {
  let { email, payment_method, cvc, cardNum, exp_year, exp_month, amount } = req.body;

  try {
    const token = await stripe.tokens.create({
      card: {
        number: cardNum,
        exp_month: exp_month,
        exp_year: exp_year,
        cvc: cvc,
      },
    });

    await stripe.customers
      .create({
        name: email,
        email: email,
        source: token.id,
      })
      .then((customer) => {
        stripe.charges.create({
          amount: +amount * 100,
          currency: "usd",
          customer: customer.id,
        });
      })
      .then(() => res.status(200).json({ success: true, message: "Payment Successful" }))
      .catch((err) =>
        res.status(400).json({
          success: false,
          message: "Payment Failed",
        })
      );
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Payment Failed",
    });
  }
};
const UpdateUserInfo = async (user_id, cus_id, sub_id) => {
  let bData = {
    customer_id: cus_id,
    sub_id: sub_id,
  };
  let UserInfo = await Deposit.findByIdAndUpdate(user_id, bData, {
    new: true,
    runValidators: true,
  });

  // res.status(200).json({
  //     success: true,
  //     data: UserInfo,
  // })
};

exports.stripePaymentSubscriptions = async (req, res) => {
  let { email, payment_method, cvc, cardNum, exp_year, exp_month, amount, userId, customer_id } =
    req.body;
  //   let user = await User.findOne({ _id: userId });
  try {
    // create token
    const token = await stripe.tokens.create({
      card: {
        number: cardNum,
        exp_month: exp_month,
        exp_year: exp_year,
        cvc: cvc,
      },
    });

    // create customer
    let customer = await stripe.customers.create({
      name: email,
      email: email,
      source: token.id,
    });

    const product = await stripe.products.create({
      name: "Gold Special",
    });

    const price = await stripe.prices.create({
      unit_amount: 2500,
      currency: "usd",
      recurring: { interval: "month" },
      // product: 'prod_MdBpyqSYjJwz8b',
      product: product.id,
    });

    const subscription = await stripe.subscriptions.create({
      // customer: 'cus_MZQSpOn0dSItOX',
      customer: customer.id,
      items: [
        //   {price: 'price_1LtvSJEqCRWTYE4oBLRSccCJ'},
        { price: price.id },
      ],
    });

    UpdateUserInfo(userId, customer.id, subscription.id);
    res.status(200).json({ success: true, message: "Payment Successful" });
    // await stripe.customers
    //     .create({
    //         name: email,
    //         email: email,
    //         source: token.id
    //     })

    //     .then(customer => {
    //         UpdateUserInfo(userId, customer.id)
    //         stripe.charges.create({
    //             amount: +amount * 100,
    //             currency: "usd",
    //             customer: customer.id
    //         })
    //     }
    //     )
    //     .then(() => res.status(200).json({ success: true, message: "Payment Successful", }))
    //     .catch(err =>
    //         res.status(400).json({
    //             success: false,
    //             message: "Payment Failed"
    //         }));
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Payment Failed",
    });
  }
};

exports.depositAmount = async (req, res) => {
  let { user_id, wallet, cretits } = req.body;

  try {
    const doesUserExist = await Deposit.findOne({ user_id: user_id });

    if (doesUserExist) {
      let creditsInfo = await Deposit.findByIdAndUpdate(
        doesUserExist._id,
        {
          $inc: {
            wallet: +wallet,
            // , cretits: cretits
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        success: true,
        data: creditsInfo,
      });
    } else {
      Deposit(req.body)
        .save()
        .then((item) => res.json({ success: true, data: item }));
    }
  } catch (e) {
    res.json({ success: false, data: "Something went wrong" });
  }
};

exports.balanceInfo = async (req, res) => {
  let { user_id } = req.params;
  try {
    const doesUserExist = await Deposit.findOne({ user_id: user_id }).populate(
      "user_id",
      "name email"
    );

    if (doesUserExist) {
      res.status(200).json({
        success: true,
        data: doesUserExist,
      });
    } else {
      res.status(200).json({
        success: true,
        data: [],
      });
    }
  } catch (e) {
    res.json({ success: false, data: "Something went wrong" });
  }
};

// remove amount
exports.withdrawAmount = async (req, res) => {
  let { user_id, wallet, cretits } = req.body;

  try {
    const doesUserExist = await Deposit.findOne({ user_id: user_id });

    if (doesUserExist) {
      let creditsInfo = await Deposit.findByIdAndUpdate(
        doesUserExist._id,
        { $inc: { wallet: -wallet, cretits: cretits } },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        success: true,
        data: creditsInfo,
      });
    } else {
      MyWalletModal(req.body)
        .save()
        .then((item) => res.json({ success: true, data: item }));
    }
  } catch (e) {
    res.json({ success: false, data: "Something went wrong" });
  }
};

exports.withdrawAmountForBuyingNumber = async (req, res) => {
  let { user_id, wallet, cretits } = req.body;

  try {
    const doesUserExist = await Deposit.findOne({ user_id: user_id });

    if (doesUserExist) {
      // let findUser = await MyWalletModal.findById({user_id})

      let creditsInfo = await Deposit.findByIdAndUpdate(
        doesUserExist._id,
        { $inc: { wallet: -wallet } },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        success: true,
        data: creditsInfo,
      });
    } else {
      MyWalletModal(req.body)
        .save()
        .then((item) => res.json({ success: true, data: item }));
    }
  } catch (e) {
    res.json({ success: false, data: "Something went wrong" });
  }
};

exports.purchased_Num = async (req, res) => {
  try {
    let existNumber = await Deposit.findOne({
      purchased_Num: req.body.purchased_Num,
    });

    if (existNumber && existNumber?.is_Already_Purchase) {
      await axios.delete(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/IncomingPhoneNumbers/${existNumber?.purchased_NumSid}.json`,
        {
          auth: {
            username: accountSid,
            password: authToken,
          },
        }
      );
    }
    let numSid = "";
    await client.incomingPhoneNumbers
      .create({ phoneNumber: req.body.purchased_Num })
      .then((incoming_phone_number) => {
        numSid = incoming_phone_number.sid;
      });
    let updateData = {
      purchased_Num: req.body.purchased_Num,
      is_Already_Purchase: true,
      purchased_NumSid: numSid,
    };

    const doesUserExist = await Deposit.findOne({
      user_id: req.params.userid,
    });
    if (doesUserExist) {
      let UserInfo = await Deposit.findByIdAndUpdate(doesUserExist?._id, updateData, {
        new: true,
        // runValidators: true,
      });

      res.status(200).json({
        success: true,
        data: UserInfo,
      });
    } else {
      res.status(200).json({
        success: true,
        data: [],
        msg: "User not found",
      });
    }
  } catch (error) {}
};
