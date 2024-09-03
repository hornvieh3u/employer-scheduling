const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");
const {
  createGoal,
  getGoal,
  getGoalById,
  updateGoalById,
  deleteGoalById,
} = require("../controllers/goal");

router.post("/", isAuthenticated, createGoal);
router.get("/", isAuthenticated, getGoal);
router.get("/:id", isAuthenticated, getGoalById);
router.patch("/:id", isAuthenticated, updateGoalById);
router.delete("/:id", isAuthenticated, deleteGoalById);

module.exports = router;
