const router = require("express").Router();
const {
  addRecipientsWithSignatures,
  editDocumentById,
  resendEmails,
} = require("../controllers/documentRecipient");
const isAuthenticated = require("../middleware/auth");
const isRecipientAuthenticated = require("../middleware/auth/docRecipientAuth");

router.post("/:documentId", isAuthenticated, addRecipientsWithSignatures);
router.put("/:documentId", isAuthenticated, editDocumentById);
router.put("/recipient/:documentId", isRecipientAuthenticated, editDocumentById);
router.post("/email/resend", isAuthenticated, resendEmails);

module.exports = router;
