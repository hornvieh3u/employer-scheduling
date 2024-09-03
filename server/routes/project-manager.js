const router = require("express").Router();

const {
  addProjectManagement,
  updateProjectManagement,
  getProjectManagement,
  addRowProjectManagement,
  addColumnProjectManagement,
  deleteTableProjectManagement,
  deleteRowProjectManagement,
  deleteColumnProjectManagement,
} = require("../controllers/projectManager");
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");

router.get("/get", results, isAuthenticated, getProjectManagement);
router.post("/createTable", results, isAuthenticated, addProjectManagement);
router.put("/update", results, isAuthenticated, updateProjectManagement);
router.post("/addRow", results, isAuthenticated, addRowProjectManagement);
router.post("/addColumn", results, isAuthenticated, addColumnProjectManagement);
router.delete("/deleteTable", results, isAuthenticated, deleteTableProjectManagement);
router.delete("/deleteRow", results, isAuthenticated, deleteRowProjectManagement);
router.delete("/deleteColumn", results, isAuthenticated, deleteColumnProjectManagement);

module.exports = router;
