/* eslint-disable array-callback-return */
/* eslint-disable no-throw-literal */
/* eslint-disable no-useless-catch */
/* eslint-disable no-tabs */
const { check, param } = require("express-validator");
const mongoose = require("mongoose");

const validateEmail = require("./utilities/validateEmail");
// eslint-disable-next-line no-unused-vars
const validatePhone = require("./utilities/validatePhone");
const validateURL = require("./utilities/validateURL");

exports.newClientContactValidator = [
  check("fullName").notEmpty().withMessage("You should provide a valid name").trim(),

  check("email").custom(async (e) => {
    try {
      if (e) {
        const { email } = await validateEmail(e);
        if (email) {
          throw email;
        }
      }
    } catch (error) {
      throw error;
    }
  }),

  // check('phone').custom(async (phoneNo) => {
  // 	try {
  // 		if (phoneNo) {
  // 			let { phone } = await validatePhone(phoneNo);
  // 			if (phone) {
  // 				throw phone;
  // 			}
  // 		}
  // 	} catch (error) {
  // 		throw error;
  // 	}
  // }),
];

exports.updateClientContactValidator = [
  // check("phone").custom(async (phoneNo) => {
  //   try {
  //     if (phoneNo) {
  //       let { phone } = await validatePhone(phoneNo);
  //       if (phone) {
  //         throw phone;
  //       }
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // }),

  check("email").custom(async (e) => {
    try {
      if (e) {
        const { email } = await validateEmail(e);
        if (email) {
          throw email;
        }
      }
    } catch (error) {
      throw error;
    }
  }),

  check("socialLinks").custom(async (socialLinks) => {
    try {
      if (socialLinks && socialLinks.length > 0) {
        socialLinks.map((l) => {
          if (l.name && l.link) {
            const { name, url } = validateURL(l);
            if (url) {
              throw `${name} url for [${l.link}] is invalid`;
            }
          }
        });
      }
    } catch (error) {
      throw error;
    }
  }),
];

exports.deleteClientContactValidator = [
  param("id").custom(async (id) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw "Invaild user";
      }
    } catch (error) {
      throw error;
    }
  }),
];

exports.getClientContactValidator = [
  param("id").custom(async (id) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw "Invaild user";
      }
    } catch (error) {
      throw error;
    }
  }),
];

exports.addRankValidator = [
  check("name").notEmpty().withMessage("You should provide a valid rank name").trim(),

  check("clientId")
    .trim()
    .custom(async (clientId) => {
      try {
        if (!mongoose.Types.ObjectId.isValid(clientId)) {
          throw "Invaild user";
        }
      } catch (error) {
        throw error;
      }
    }),
];

exports.editRankValidator = [
  check("name").notEmpty().withMessage("You should provide a valid rank name").trim(),

  check("clientId")
    .trim()
    .custom(async (clientId) => {
      try {
        if (!mongoose.Types.ObjectId.isValid(clientId)) {
          throw "Invaild user";
        }
      } catch (error) {
        throw error;
      }
    }),
];

exports.addOtherValidator = [
  // check("address")
  //   .notEmpty()
  //   .withMessage("You should provide a valid address")
  //   .trim()
  //   .custom(async (address) => {
  //     console.log("address: ", address);
  //   }),
  // check("phone")
  //   .notEmpty()
  //   .withMessage("You should provide a valid phone number")
  //   .trim(),
];
