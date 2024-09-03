const router = require("express").Router();
const {
  uploadAndSaveDocument,
  deleteAndDestroyDocumentById,
  getAllDocuments,
  getDocumentById,
  getReceivedDocuments,
  generateToken,
  getDocumentByHashCode,
  deleteAndDestroyMultipleDocuments,
} = require("../controllers/document");
const isAuthenticated = require("../middleware/auth");
const isRecipientAuth = require("../middleware/auth/docRecipientAuth");
const { singleUploadControl } = require("../middleware/upload");

router.post("/upload", isAuthenticated, singleUploadControl, uploadAndSaveDocument);
router.delete("/documentId/:id", isAuthenticated, deleteAndDestroyDocumentById);
router.post("/delete", isAuthenticated, deleteAndDestroyMultipleDocuments);
router.get("/", isAuthenticated, getAllDocuments);
router.get("/documentId/:id", isAuthenticated, getDocumentById);
router.get("/received", isAuthenticated, getReceivedDocuments);
router.post("/email-link", generateToken); // check if recipient is exists then generate token
router.get("/email-link", isRecipientAuth, getDocumentByHashCode); // validate token & return document

module.exports = router;
