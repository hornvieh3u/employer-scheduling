/* eslint-disable no-throw-literal */
/* eslint-disable no-useless-catch */
const { check, param } = require("express-validator");
const mongoose = require("mongoose");

exports.newTaskValidator = [
  check("projectId")
    .notEmpty()
    .withMessage("You should provide a valid project")
    .trim()
    .custom(async (projectId) => {
      try {
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
          throw "No data found";
        }
      } catch (error) {
        throw error;
      }
    }),

  check("taskName").notEmpty().withMessage("You should provide a valid task name").trim(),
];

exports.updateTaskValidator = [
  check("projectId").custom(async (projectId) => {
    try {
      if (projectId) {
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
          throw "No data found";
        }
      }
    } catch (error) {
      throw error;
    }
  }),

  param("id")
    .trim()
    .custom(async (id) => {
      try {
        if (id) {
          if (!mongoose.Types.ObjectId.isValid(id)) {
            throw "No data found";
          }
        }
      } catch (error) {
        throw error;
      }
    }),
];

exports.deleteTaskValidator = [
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

exports.getTaskValidator = [
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
