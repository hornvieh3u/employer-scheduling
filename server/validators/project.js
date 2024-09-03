/* eslint-disable no-throw-literal */
/* eslint-disable no-useless-catch */
const { check, param } = require("express-validator");
const mongoose = require("mongoose");

exports.newProjectValidator = [
  check("projectName").notEmpty().withMessage("You should provide a valid project").trim(),

  check("budget")
    .trim()
    .custom(async (budget) => {
      try {
        if (budget) {
          if (Number.isNaN(budget)) {
            throw "Budget must be a numeric value";
          }
        }
      } catch (error) {
        throw error;
      }
    }),
];

exports.updateProjectValidator = [
  check("budget")
    .trim()
    .custom(async (budget) => {
      try {
        if (budget) {
          if (Number.isNaN(budget)) {
            throw "Budget must be a numeric value";
          }
        }
      } catch (error) {
        throw error;
      }
    }),

  param("id").custom(async (id) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw "No data found";
      }
    } catch (error) {
      throw error;
    }
  }),
];

exports.deleteProjectValidator = [
  param("id").custom(async (id) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw "No data found";
      }
    } catch (error) {
      throw error;
    }
  }),
];

exports.getProjectValidator = [
  param("id").custom(async (id) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw "No data found";
      }
    } catch (error) {
      throw error;
    }
  }),
];
