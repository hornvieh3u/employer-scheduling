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
  vendorPosition,
  getVendorPositions,
  deleteVendorPosition,
  getForAddEvent,
  putVendorPosition,
} = require("../controllers/VendorContact");

const isAuthenticated = require("../middleware/auth");

// States
router.get("/total-contact", isAuthenticated, totalContact);
router.get("/total-contact-count", isAuthenticated, totalContactCount);
router.get("/total-cold-contact-count", isAuthenticated, ColdLeadCount);
router.get("/total-warm-contact-count", isAuthenticated, warmLeadCount);
router.get("/total-hot-contact-count", isAuthenticated, HotLeadsCount);

// Get for addevent
router.get("/get-for-addevent", isAuthenticated, getForAddEvent);

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

// Delete Other
router.post("/delete/other", isAuthenticated, removeOther);

// Create New Vendor Position
router.post("/position", isAuthenticated, vendorPosition);

// Load or Fetch Vendor Position Data
// http://localhost:5000/mymanager/Vendor-contact/
router.get("/", isAuthenticated, getVendorPositions);

// Delete Vendor Position Data
// http://localhost:5000/mymanager/vendor-contact/id
router.delete("/:id", isAuthenticated, deleteVendorPosition);

// Put Vendor Position
router.put("/:id", isAuthenticated, putVendorPosition);

module.exports = router;
