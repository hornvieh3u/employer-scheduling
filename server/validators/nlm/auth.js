const { check } = require("express-validator");

exports.signupValidator = [
  check("fullName")
    .notEmpty()
    .withMessage("You should provide a valid name")
    .trim(),

  check("email")
    .notEmpty()
    .isEmail()
    .withMessage("You should provide a valid email"),

  check("phone")
    .notEmpty()
    .withMessage("You should provide a valid phone number"),

  check("password")
    .notEmpty()
    .withMessage("You should provide a password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
];

exports.loginValidator = [
  check("email")
    .notEmpty()
    .isEmail()
    .withMessage("You should provide a valid email"),

  check("password")
    .notEmpty()
    .withMessage("You should provide a valid password"),
];
