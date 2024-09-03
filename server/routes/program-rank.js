const express = require("express");

const router = express.Router();
const { singleUploadControl } = require("../middleware/upload");
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const {
  create, programInfo, update, remove
} = require("../controllers/programRank");

router.get("/program_rank_info/:program_rank_id", results, isAuthenticated, programInfo);
router.post("/add_program_rank/:userId", results, isAuthenticated, singleUploadControl, create);
router.put(
  "/update_program_rank/:userId/:program_rank_id",
  results,
  isAuthenticated,
  singleUploadControl,
  update
);
router.delete("/delete_program_rank/:userId/:program_rank_id", results, isAuthenticated, remove);

module.exports = router;
