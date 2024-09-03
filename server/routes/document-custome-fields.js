const router = require("express").Router();

const {
  addCustomField,
  deleteCustomField,
  getFieldsByUser,
} = require("../controllers/documentCustomFields");
const isAuthenticated = require("../middleware/auth");

router.post("/add", isAuthenticated, addCustomField);
router.delete("/delete", isAuthenticated, deleteCustomField);
router.get("/getbyuser", isAuthenticated, getFieldsByUser);
module.exports = router;
