const router = require("express").Router();

const {
  addOrUpdateLocation,
  getUserDetails,
  updateUserDetails,
  userDetailsByUserId,
  getByUserId,
} = require("../controllers/user");
const isAuthenticated = require("../middleware/auth");

router.get("/", isAuthenticated, getUserDetails);
router.get("/:userId", isAuthenticated, getByUserId); // this api for admin only.
router.get("/details", isAuthenticated, userDetailsByUserId);
router.put("/location", isAuthenticated, addOrUpdateLocation);
router.put("/:userId", isAuthenticated, updateUserDetails);

module.exports = router;
