const router = require("express").Router();

const {
  newEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployees,
  getEmployee,
} = require("../controllers/employee");
const {
  newEmployeeValidator,
  updateEmployeeValidator,
  deleteEmployeeValidator,
  getEmployeeValidator,
} = require("../validators/employee");
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");

router.post("/", isAuthenticated, newEmployeeValidator, results, newEmployee);

router.patch("/:id", isAuthenticated, updateEmployeeValidator, results, updateEmployee);

router.patch("/delete/:id", isAuthenticated, deleteEmployeeValidator, results, deleteEmployee);

router.get("/", isAuthenticated, getEmployees);

router.get("/:id", isAuthenticated, getEmployeeValidator, results, getEmployee);

module.exports = router;
