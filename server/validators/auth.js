/* eslint-disable */

const { check } = require("express-validator");

const validateEmail = require("./utilities/validateEmail");
// eslint-disable-next-line no-unused-vars
const validatePhone = require("./utilities/validatePhone");

exports.signupValidator = [
  check("firstName").notEmpty().withMessage("You should provide a valid first name").trim(),

  check("lastName").notEmpty().withMessage("You should provide a valid last name").trim(),

  check("phoneOrEmail")
    .notEmpty()
    .withMessage("You should provide a valid email or phone number")
    .custom(async (phoneOrEmail) => {
      try {
        // if (phoneOrEmail.indexOf("@") === -1) {
        //   // let { phone } = await validatePhone(phoneOrEmail);
        //   // if (phone) {
        //   //   throw phone;
        //   // }
        // } else {
        //   let { email } = await validateEmail(phoneOrEmail);
        //   if (email) {
        //     throw email;
        //   }
        // }
      } catch (error) {
        throw error;
      }
    }),

  check("password")
    .notEmpty()
    .withMessage("You should provide a password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
];

exports.loginValidator = [
  check("phoneOrEmail").custom(async (phoneOrEmail) => {
    try {
      if (!phoneOrEmail) {
        throw "You should provide a valid phone or email";
      } else {
        if (phoneOrEmail.indexOf("@") === -1) {
          // let { phone } = await validatePhone(phoneOrEmail);
          // if (phone) {
          //   throw phone;
          // }
        } else {
          let { email } = await validateEmail(phoneOrEmail);
          if (email) {
            throw email;
          }
        }
      }
    } catch (error) {
      throw error;
    }
  }),

  check("password").notEmpty().withMessage("You should provide a valid password"),
];

exports.resetPassValidator = [
  // check("phoneOrEmail").custom(async (phoneOrEmail) => {
  //   try {
  //     if (!phoneOrEmail) {
  //       throw "You should provide a valid phone or email";
  //     } else {
  //       if (phoneOrEmail.indexOf("@") === -1) {
  //         // let { phone } = await validatePhone(phoneOrEmail);
  //         // if (phone) {
  //         //   throw phone;
  //         // }
  //       } else {
  //         let { email } = await validateEmail(phoneOrEmail);
  //         if (email) {
  //           throw email;
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // }),
  // check("password")
  //   .notEmpty()
  //   .withMessage("You should provide a valid password"),
];
