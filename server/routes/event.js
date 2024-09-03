const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");
const { singleUploadControl } = require("../middleware/upload");

const {
  eventCreate,
  eventUpdate,
  deleteEvent,
  getEvents,
  getEventInfo,
  addNewGuests,
  deleteGuests,
  addAndUpdateGuests,
} = require("../controllers/event");
// Create event
router.post("/create/", isAuthenticated, singleUploadControl, eventCreate);
router.put("/update/:id", isAuthenticated, singleUploadControl, eventUpdate);
router.delete("/:eventId", isAuthenticated, deleteEvent);

router.get("/all/:userId", isAuthenticated, getEvents);

//Add new Guests
router.post("/add-guests", isAuthenticated, addNewGuests);
router.put("/add-update-guest/:id", addAndUpdateGuests);
router.delete("/delete-guests/:eventId/:guestId", isAuthenticated, deleteGuests);
//router.get("/info/:eventId", isAuthenticated, getEventInfo);
router.get("/info/:eventId", getEventInfo);

module.exports = router;
