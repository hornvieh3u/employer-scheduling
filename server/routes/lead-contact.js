const router = require("express").Router();

const {
  getContacts,
  contactAdd,
  totalLeads,
  totalLeadsCount,
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
  leadPosition,
  getLeadPositions,
  deleteLeadPosition,
  putLeadPosition,
  updateContactStage,
  getForAddEvent,
} = require("../controllers/leadContact");

const isAuthenticated = require("../middleware/auth");

// UPload Handler
const { upload } = require("../lib/upload");

// States
router.get("/total-contact", isAuthenticated, totalLeads);
router.get("/total-contact-count", isAuthenticated, totalLeadsCount);
router.get("/total-cold-contact-count", isAuthenticated, ColdLeadCount);
router.get("/total-warm-contact-count", isAuthenticated, warmLeadCount);
router.get("/total-hot-contact-count", isAuthenticated, HotLeadsCount);

// contact import
router.post("/import-contact-array", isAuthenticated, importContactsFromArray);

router.post("/add", isAuthenticated, contactAdd);
router.get("/list", isAuthenticated, getContacts);

// contact for add event
router.get("/get-for-addevent", isAuthenticated, getForAddEvent);

router.get("/:id", isAuthenticated, getSingleContact);
router.post("/update", isAuthenticated, updateContact);
router.post("/update-stage", isAuthenticated, updateContactStage);
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

// Delete Other
router.post("/delete/other", isAuthenticated, removeOther);

// Create New Lead Position
router.post("/position", isAuthenticated, leadPosition);

// Load or Fetch Lead Position Data
// http://localhost:5000/mymanager/lead-contact/
router.get("/", isAuthenticated, getLeadPositions);

// Delete Lead Position Data
// http://localhost:5000/mymanager/lead-contact/id
router.delete("/:id", isAuthenticated, deleteLeadPosition);

// Put Lead Position
router.put("/:id", isAuthenticated, putLeadPosition);

module.exports = router;
