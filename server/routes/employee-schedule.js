const router = require("express").Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const employeeSchedule = require("../controllers/employeeSchedule");

router.post("/", isAuthenticated, results, employeeSchedule.setSchedule);
router.post("/update", isAuthenticated, results, employeeSchedule.updateSchedule);
router.post("/delete", isAuthenticated, results, employeeSchedule.deleteSchedule);

router.get("/week", isAuthenticated, employeeSchedule.getWeekSchedules);
router.post("/add/employees", isAuthenticated, employeeSchedule.addEmployeesToSchedule);
router.post("/add/shifts", isAuthenticated, employeeSchedule.addShiftsToSchedule);
router.post("/update/shift", isAuthenticated, employeeSchedule.updateShiftInSchedule);
// router.get("/day", employeeSchedule.getWeekSchedules);

module.exports = router;
