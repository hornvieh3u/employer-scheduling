const router = require("express").Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");

const {
  newWorkspace,
  getAllWorkspace,
  getWorkspace,
  getCollabrators,
  updateWorkspace,
  shareWorkspace,
  deleteWorkspace,
} = require("../controllers/workspace");

router.get("/get-all/:userId", isAuthenticated, results, getAllWorkspace);
router.get("/get/:workspaceId", isAuthenticated, results, getWorkspace);
router.get("/get-collabrators", isAuthenticated, results, getCollabrators);

router.post("/add", isAuthenticated, results, newWorkspace);
router.post("/share", isAuthenticated, results, shareWorkspace);
router.post("/update", isAuthenticated, results, updateWorkspace);

router.delete("/delete/:_id", isAuthenticated, results, deleteWorkspace);

module.exports = router;
