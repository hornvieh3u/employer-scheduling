const router = require("express").Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");

const { newLabel, getLabel, updateLabel, deleteLabel } = require("../controllers/label");

router.post("/add", isAuthenticated, results, newLabel);
router.get("/get", isAuthenticated, results, getLabel);
router.post("/update", isAuthenticated, results, updateLabel);
router.delete("/delete/:_id", isAuthenticated, results, deleteLabel);

module.exports = router;
