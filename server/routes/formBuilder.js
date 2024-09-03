const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const { createForm, getForms, deleteForm } = require("../controllers/formBuilder");

router.post("/create", isAuthenticated, createForm);
router.post("/get", isAuthenticated, getForms);
router.post("/delete", isAuthenticated, deleteForm);

module.exports = router;
