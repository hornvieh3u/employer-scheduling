const router = require("express").Router();
const {
  createStripeCustomer,
  createStripeCard,
  createStripeCharge,
  createStripePaymentIntent,
  getStripePaymentIntent,
  updateStripePaymentIntent
} = require("../controllers/payment");
const isAuthenticated = require("../middleware/auth");

router.post("/user/:userId/stripe/customer", isAuthenticated, createStripeCustomer);
router.post("/user/:userId/stripe/payment-intent", isAuthenticated, createStripePaymentIntent);
router.get("/user/:userId/stripe/payment-intent/:id", isAuthenticated, getStripePaymentIntent);
router.put("/user/:userId/stripe/payment-intent/:id", isAuthenticated, updateStripePaymentIntent);

// alternatives to payment-intent API
router.post("/user/:userId/stripe/card", isAuthenticated, createStripeCard);
router.post("/user/:userId/stripe/charge", isAuthenticated, createStripeCharge);

module.exports = router;
