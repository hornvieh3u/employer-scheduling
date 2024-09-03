/* eslint-disable no-throw-literal */
/* eslint-disable no-useless-catch */
const { check, param } = require("express-validator");
const mongoose = require("mongoose");

exports.newTaskContactValidator = [
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

  check("clientId")
    .trim()
    .custom(async (clientId) => {
      try {
        if (clientId) {
          if (!mongoose.Types.ObjectId.isValid(clientId)) {
            throw "No data found";
          }
        }
      } catch (error) {
        throw error;
      }
    }),
];

exports.updateTaskContactValidator = [
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

  check("clientId").custom(async (clientId) => {
    try {
      if (clientId) {
        if (!mongoose.Types.ObjectId.isValid(clientId)) {
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

exports.deleteTaskContactValidator = [
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

exports.getTaskContactValidator = [
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
