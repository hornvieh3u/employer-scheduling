const { Temp } = require("../models/index/index");
const { Authenticate } = require("../models/index/index");
const asyncHandler = require("express-async-handler");
const { generateOTP, sendEmailVerification, phoneOtpSend } = require("../Utilities/generateOTP");

exports.sendOTP = asyncHandler(async (req, res) => {
  let phone = "";
  let email = "";
  const { firstName, lastName, phoneOrEmail, countryCode } = req.body;
  const otp = generateOTP();
  var method = "phone";

  if (phoneOrEmail.indexOf("@") === -1) {
    phone = phoneOrEmail;
    method = "phone";
  } else {
    email = phoneOrEmail;
    method = "email";
  }

  console.log("====================================");
  console.log("Identifyer is ", method);
  console.log("====================================");

  Authenticate.findOne({ email, phone }, (err, user) => {
    if (err) {
      return res.status(500).json({
        errors: { common: { msg: err.message } },
      });
    }
    if (user) {
      return res.status(500).json({
        errors: { common: { msg: "Phone or email already taken" } },
      });
    } else {
      Temp.findOne({ phoneOrEmail }).exec(async (err, user) => {
        if (err) {
          return res.status(500).json({
            errors: { common: { msg: err.message } },
          });
        }

        if (user) {
          try {
            user.firstName = firstName;
            user.lastName = lastName;
            user.phoneOrEmail = phoneOrEmail;
            user.otp = otp;
            await user.save();
            // Send Otp
            if (method === "phone") {
              // Sent OTP to phone
              phoneOtpSend({ name: firstName, phone, otp, countryCode });
            } else {
              await sendEmailVerification(email, otp);
            }
            return res.status(201).json({
              success: "OTP re-generate successfull.",
            });
          } catch (error) {
            return res.status(500).json({
              errors: { common: { msg: err.message } },
            });
          }
        } else {
          let tempUser = new Temp({ firstName, lastName, phoneOrEmail, otp });
          // Send Otp
          if (method === "phone") {
            // Sent OTP to phone
            phoneOtpSend({ name: firstName, phone, otp, countryCode });
          } else {
            await sendEmailVerification(email, otp);
          }

          tempUser.save((err, success) => {
            if (err) {
              return res.status(500).json({
                errors: { common: { msg: err.message } },
              });
            }

            if (success) {
              return res.status(201).json({
                success: "OTP generate successfull.",
              });
            }
          });
        }
      });
    }
  });
});
