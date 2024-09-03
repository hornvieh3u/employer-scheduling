const express = require("express");
const router = express.Router();
const { singleUploadControl } = require("../middleware/upload");
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const { create, rankCategoryInfo, update, remove } = require("../controllers/rankCategory");

router.post(
  "/add_category_rank/:categoryId",
  results,
  isAuthenticated,
  singleUploadControl,
  create
);
router.get("/category_rank_info/:categoryId", results, isAuthenticated, rankCategoryInfo);
router.put(
  "/update_category_rank/:category_rank_id",
  results,
  isAuthenticated,
  singleUploadControl,
  update
);
router.delete("/delete_category_rank/:category_rank_id", results, isAuthenticated, remove);

module.exports = router;
