const router = require("express").Router();
const { createMenu, getMenu } = require("../controllers/menu");
const isAuthenticated = require("../middleware/auth");

router.post("/menu", isAuthenticated, createMenu);
router.get("/menu", isAuthenticated, getMenu);

module.exports = router;
