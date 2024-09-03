const { check } = require("express-validator");

// const validateEmail = require("./utilities/validateEmail");
// const validatePhone = require("./utilities/validatePhone");

exports.sendOTPValidator = [
  check("firstName").notEmpty().withMessage("You should provide a valid first name").trim(),

  check("lastName").notEmpty().withMessage("You should provide a valid last name").trim(),

  check("phoneOrEmail").notEmpty().withMessage("You should provide a valid email or phone number"),
  // .custom(async (phoneOrEmail) => {
  //   try {
  //     // if (phoneOrEmail.indexOf("@") === -1) {
  //     //   let { phone } = await validatePhone(phoneOrEmail);
  //     //   // if (phone) {
  //     //   //   throw phone;
  //     //   // }
  //     // } else {
  //     //   let { email } = await validateEmail(phoneOrEmail);
  //     //   if (email) {
  //     //     throw email;
  //     //   }
  //     // }
  //   } catch (error) {
  //     lllllll
  //     throw error;

  //   }
  // }),
];
