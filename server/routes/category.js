const express = require("express");
const router = express.Router();
const {
  createCategory,
  categoryDetails,
  categoryUpdate,
  categoryDelete,
} = require("../controllers/category");
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");

router.post("/addCategory/:progressionId", results, isAuthenticated, createCategory);
router.get("/categoryDetails", results, isAuthenticated, categoryDetails);
router.put("/categoryUpdate/:categoryId", results, isAuthenticated, categoryUpdate);
router.delete("/categoryDelete/:categoryId", results, isAuthenticated, categoryDelete);

module.exports = router;
