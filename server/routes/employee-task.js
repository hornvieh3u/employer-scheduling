const router = require("express").Router();

const isAuthenticated = require("../middleware/auth");
const {
  createTask,
  updateTask,
  getTaskByUserId,
  getTaskByEmpRoleId,
  markTaskStatus,
} = require("../controllers/employeeTask");

router.post("/", isAuthenticated, createTask);
router.patch("/:id", isAuthenticated, updateTask);
router.get("/user", isAuthenticated, getTaskByUserId);
router.get("/employee", isAuthenticated, getTaskByEmpRoleId);
router.patch("/mark-status/:id", isAuthenticated, markTaskStatus);

module.exports = router;
