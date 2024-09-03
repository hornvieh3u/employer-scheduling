const router = require("express").Router();

const {
  newTaskContact,
  updateTaskContact,
  deleteTaskContact,
  getTaskContact,
  getTaskContacts,
} = require("../controllers/taskContact");
const {
  newTaskContactValidator,
  updateTaskContactValidator,
  deleteTaskContactValidator,
  getTaskContactValidator,
} = require("../validators/taskContact");
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");

router.post(
  "/",
  isAuthenticated,
  newTaskContactValidator,
  results,
  newTaskContact
);

router.patch(
  "/:id",
  isAuthenticated,
  updateTaskContactValidator,
  results,
  updateTaskContact
);

router.patch(
  "/delete/:id",
  isAuthenticated,
  deleteTaskContactValidator,
  results,
  deleteTaskContact
);

router.get("/", isAuthenticated, getTaskContacts);

router.get(
  "/:id",
  isAuthenticated,
  getTaskContactValidator,
  results,
  getTaskContact
);

module.exports = router;
