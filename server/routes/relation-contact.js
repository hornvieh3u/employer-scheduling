const router = require("express").Router();

const {
  getContacts,
  contactAdd,
  totalContact,
  totalContactCount,
  ColdLeadCount,
  warmLeadCount,
  HotLeadsCount,
  getSingleContact,
  updateContact,
  updateSocialLink,
  fileAddAndUpdate,
  deleteFile,
  addNewOther,
  // editOther,
  removeOther,
  uploadAvatar,
  deleteContact,
  importContactsFromArray,
  getRelationPositions,
  relationPosition,
  deleteRelationPosition,
  putRelationPosition,
  getForAddEvent,
} = require("../controllers/relationContact");

const isAuthenticated = require("../middleware/auth");

// Delete one Relation Position
router.delete("/position/:id", isAuthenticated, deleteRelationPosition);

// Update one Relation Position
router.put("/position/:id", isAuthenticated, putRelationPosition);

// States
router.get("/total-contact", isAuthenticated, totalContact);
router.get("/total-contact-count", isAuthenticated, totalContactCount);
router.get("/total-cold-contact-count", isAuthenticated, ColdLeadCount);
router.get("/total-warm-contact-count", isAuthenticated, warmLeadCount);
router.get("/total-hot-contact-count", isAuthenticated, HotLeadsCount);

//Get for add event
router.get("/get-for-addevent", isAuthenticated, getForAddEvent);

// get Relation Position Data Route
router.get("/position", isAuthenticated, getRelationPositions);

// contact import
router.post("/import-contact-array", isAuthenticated, importContactsFromArray);

// UPload Handler
const { upload } = require("../lib/upload");

router.post("/add", isAuthenticated, contactAdd);
router.get("/list", isAuthenticated, getContacts);

router.get("/:id", isAuthenticated, getSingleContact);
router.post("/update", isAuthenticated, updateContact);
router.post("/delete-contact", isAuthenticated, deleteContact);

// update social media
router.post("/update-social-links", isAuthenticated, updateSocialLink);

// Files Add
router.post("/file-add", isAuthenticated, upload.single("file"), fileAddAndUpdate);

router.post("/file-delete", isAuthenticated, deleteFile);

// Add Other
router.post(
  "/add/other",
  isAuthenticated,
  upload.single("file"),
  // addOtherValidator,
  // results,
  addNewOther
);

router.post("/upload-avatar", isAuthenticated, upload.single("file"), uploadAvatar);

// Create New Relation Position
router.post("/position", isAuthenticated, relationPosition);

// Delete Other
router.post("/delete/other", isAuthenticated, removeOther);

module.exports = router;
