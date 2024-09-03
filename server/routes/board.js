const router = require("express").Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");

const {
  newTaskBoard,
  getTaskBoard,
  updateTaskBoard,
  deleteTaskBoard,
} = require("../controllers/board");

// router.get("/get", isAuthenticated, results, getTaskBoard);
router.post("/add", isAuthenticated, results, newTaskBoard);
router.post("/update", isAuthenticated, results, updateTaskBoard);
router.delete("/delete/:_id/:workspaceId", isAuthenticated, results, deleteTaskBoard);

module.exports = router;
