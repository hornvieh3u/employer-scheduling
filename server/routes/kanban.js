const router = require("express").Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const { singleUploadControl } = require("../middleware/upload");

const {
  newTaskKanban,
  getTaskKanban,
  updateTaskKanban,
  updateTaskBoardId,
  reorderTaskKanban,
  clearTasks,
  deleteTaskKanban,
} = require("../controllers/kanban");

router.post("/add", isAuthenticated, results, newTaskKanban);
router.get("/get", isAuthenticated, results, getTaskKanban);

router.post("/update", isAuthenticated, results, singleUploadControl, updateTaskKanban);
router.post("/update-taskboard", isAuthenticated, results, updateTaskBoardId);

router.post("/reorder", isAuthenticated, results, reorderTaskKanban);
router.delete("/deleteByBoardId/:boardId", isAuthenticated, results, clearTasks);
router.delete("/delete/", isAuthenticated, results, deleteTaskKanban);

module.exports = router;
