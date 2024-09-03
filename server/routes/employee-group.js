const router = require("express").Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const employeeGroup = require("../controllers/employeeGroup");

router
  .route("/")
  .get(isAuthenticated, results, employeeGroup.getGroups)
  .post(isAuthenticated, results, employeeGroup.setGroup);
router.post('/update', isAuthenticated, results, employeeGroup.updateGroup)
router.post('/delete', isAuthenticated, results, employeeGroup.deleteGroup);

module.exports = router;
