const router = require("express").Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const employeeShift = require("../controllers/employeeShift");

router
  .route("/")
  .get(isAuthenticated, results, employeeShift.getShiftsList)
  .post(isAuthenticated, results, employeeShift.setShift);
router.post("/update", isAuthenticated, results, employeeShift.updateShift);
router.post("/delete", isAuthenticated, results, employeeShift.deleteShift);

module.exports = router;
