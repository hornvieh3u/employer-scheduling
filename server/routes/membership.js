const router = require("express").Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const membershipController = require("../controllers/membership");

// membership routes 
router.get(
  "/membership_list",
  results,
  isAuthenticated,
  membershipController.membershipList
);

router.post(
  "/membership/add_membership/:shopId",
  results,
  isAuthenticated,
  membershipController.create
);

router.post(
  "/add_wishlist/:membershipId",
  results,
  isAuthenticated,
  membershipController.addToWishlist
);
router.post(
  "/remove_wishlist/:membershipId",
  results,
  isAuthenticated,
  membershipController.removeFromWishlist
);
router.get(
  "/membership/info_membership/:membershipId",
  results,
  isAuthenticated,
  membershipController.membershipInfo
);
router.put(
  "/membership/update_by_Id/:membershipId",
  results,
  isAuthenticated,
  membershipController.membershipUpdate
);
router.delete(
  "/membership/delete_membership/:Id",
  isAuthenticated,
  results,
  membershipController.remove
);
module.exports = router;
