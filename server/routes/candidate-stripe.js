const express = require("express");

const router = express.Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const {
  create_stripe,
  candidate_stripe_update,
  candidate_stripe_detail,
  candidate_stripe_remove,
} = require("../controllers/candidateStripe");
const { singleUploadControl } = require("../middleware/upload");

router.get("/stripe-info/:userId/:stripeId", results, isAuthenticated, candidate_stripe_detail);
router.post("/add-stripe/:userId", singleUploadControl, results, isAuthenticated, create_stripe);
router.put(
  "/update-stripe/:userId/:stripeId",
  results,
  isAuthenticated,
  singleUploadControl,
  candidate_stripe_update
);
router.delete(
  "/delete-stripe/:userId/:stripeId",
  results,
  isAuthenticated,
  candidate_stripe_remove
);

module.exports = router;
