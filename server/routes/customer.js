const router = require("express").Router();
const { addCustomer, getCustomers } = require("../controllers/customer");
const isAuthenticated = require("../middleware/auth");

router.post("/", isAuthenticated, addCustomer);
router.get("/", isAuthenticated, getCustomers);

module.exports = router;
