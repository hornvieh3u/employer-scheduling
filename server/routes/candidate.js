const express = require("express");

const router = express.Router();
const {
  candidate_create,
  candidate_read,
  candidate_update,
  candidate_remove,
} = require("../controllers/candidate");
const { singleUploadControl } = require("../middleware/upload");
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");

router.post("/add_candidate", results, isAuthenticated, singleUploadControl, candidate_create);
router.get("/list_of_candidate", results, isAuthenticated, candidate_read);
router.put(
  "/update_candidate/:candidateId",
  results,
  isAuthenticated,
  singleUploadControl,
  candidate_update
);
router.delete("/delete_candidate/:candidateId", results, isAuthenticated, candidate_remove);

module.exports = router;
