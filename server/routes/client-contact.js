const router = require("express").Router();

const {
  newClientContact,
  updateClientContact,
  deleteClientContact,
  getClientContacts,
  getClientContact,
  getTotalClients,
  getTotalClientsCount,
  getPastDueClient,
  getActiveClients,
  getFormerClients,
  addNewRank,
  removeRank,
  importContacts,
  importContactsFromArray,
  getTags,
  uploadAvatar,
  filesUpload,
  addNewOther,
  removeOther,
  editNewRank,
  DeleteUploadedFile,
  editOther,
  addPaymentMethod,
  deletePaymentMethod,
  updatePaymentMethod,
  updateBillingInfo,
  clientPosition,
  getClientPositions,
  deleteClientPosition,
  putClientPosition,
  getForAddEvent,
} = require("../controllers/clientContact");
const {
  newClientContactValidator,
  updateClientContactValidator,
  deleteClientContactValidator,
  getClientContactValidator,
  addRankValidator,
  addOtherValidator,
  editRankValidator,
} = require("../validators/clientContact");
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");

// UPload Handler
const { upload } = require("../lib/upload");

router.post("/", isAuthenticated, newClientContactValidator, results, newClientContact);

router.patch("/remove-rank", isAuthenticated, removeRank);
router.patch("/remove-other", isAuthenticated, removeOther);

router.patch("/:id", isAuthenticated, updateClientContactValidator, results, updateClientContact);

router.patch(
  "/delete/:id",
  isAuthenticated,
  deleteClientContactValidator,
  results,
  deleteClientContact
);

// Delete one Client Position
router.delete("/position/:id", isAuthenticated, deleteClientPosition);

// Update one Client Position
router.put("/position/:id", isAuthenticated, putClientPosition);

router.get("/", isAuthenticated, getClientContacts);

router.get("/total-clients", isAuthenticated, getTotalClients);

router.get("/total-clients-count", isAuthenticated, getTotalClientsCount);

router.get("/active-clients", isAuthenticated, getActiveClients);

router.get("/past-due-clients", isAuthenticated, getPastDueClient);

router.get("/former-clients", isAuthenticated, getFormerClients);

router.get("/tags", isAuthenticated, getTags);

// get Client Position Data Route
router.get("/position", isAuthenticated, getClientPositions);

//Get clients for add event
router.get("/get-for-addevent", isAuthenticated, getForAddEvent);

router.get("/:id", isAuthenticated, getClientContactValidator, results, getClientContact);

router.post(
  "/add-rank",
  isAuthenticated,
  upload.single("file"),
  addRankValidator,
  results,
  addNewRank
);

router.patch(
  "/rank/edit",
  upload.single("file"),
  isAuthenticated,
  editRankValidator,
  results,
  editNewRank
);

router.post(
  "/add/other",
  isAuthenticated,
  upload.single("file"),
  addOtherValidator,
  results,
  addNewOther
);

router.patch("/edit/other", isAuthenticated, editOther);
router.patch("/remove-other", isAuthenticated, removeOther);
router.post("/import-contact-array", isAuthenticated, importContactsFromArray);
router.post("/import-contacts", isAuthenticated, importContacts);

router.post("/upload-avatar", isAuthenticated, upload.single("file"), uploadAvatar);

router.post("/upload-file", isAuthenticated, upload.single("file"), filesUpload);
router.post("/delete-file", isAuthenticated, DeleteUploadedFile);

// Add payment method
router.post("/add/payment-method", isAuthenticated, addPaymentMethod);
// Delete Payment Method
router.post("/delete/payment-method", isAuthenticated, deletePaymentMethod);
// Update Payment Method
router.post("/update/payment-method", isAuthenticated, updatePaymentMethod);

// Update Billing Information
router.patch("/update/billing-info", isAuthenticated, updateBillingInfo);

// Create New Client Position
router.post("/position", isAuthenticated, clientPosition);

module.exports = router;
