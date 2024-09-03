const router = require("express").Router();
const {
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingType,
  getBookingTypeDetail,
  createBookingType,
  updateBookingType,
  deleteBookingType,
  cloneBookingType,
} = require("../controllers/calendar");
const isAuthenticated = require("../middleware/auth");

router.post("/booking/create", isAuthenticated, createBooking);
router.put("/booking/update/:id", isAuthenticated, updateBooking);
router.get("/booking/get", isAuthenticated, getBooking);
router.delete("/booking/delete/:id", isAuthenticated, deleteBooking);
router.post("/booking-type/create", isAuthenticated, createBookingType);
router.post("/booking-type/clone/:id", isAuthenticated, cloneBookingType);
router.put("/booking-type/update/:id", isAuthenticated, updateBookingType);
router.get("/booking-type/get", isAuthenticated, getBookingType);
router.get("/booking-type/info/:link", isAuthenticated, getBookingTypeDetail);
router.delete("/booking-type/delete/:id", isAuthenticated, deleteBookingType);
module.exports = router;
