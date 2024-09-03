const express = require("express");
const router = express.Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const {
  createProgression,
  progressionDetails,
  updateProgression,
  removeProgression,
} = require("../controllers/progression");

router.post("/add_progression", results, isAuthenticated, createProgression);
router.get("/get/progression_details", results, isAuthenticated, progressionDetails);
router.put(
  "/update/progression_update/:progressionId",
  results,
  isAuthenticated,
  updateProgression
);
router.delete(
  "/delete/progression_remove/:progressionId",
  results,
  isAuthenticated,
  removeProgression
);

module.exports = router;
