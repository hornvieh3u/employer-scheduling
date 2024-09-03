const router = require("express").Router();
const {
  getSmartList,
  createSmartList
} = require("../controllers/smartlist");
const isAuthenticated = require("../middleware/auth");

router.post("/create", isAuthenticated, createSmartList)
router.get("/get", isAuthenticated, getSmartList);
module.exports = router;
