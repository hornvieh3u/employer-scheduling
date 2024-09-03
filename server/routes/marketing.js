const router = require("express").Router();

const {
  composeEmail,
  getEmails,
  getEmailById,
  deleteEmailsByIds,
  // markEmailAsSpam,
  starEmails,
  sendScheduledEmailNow,
} = require("../controllers/marketing");
const isAuthenticated = require("../middleware/auth");

router.post("/compose-email", isAuthenticated, composeEmail);
router.get("/emails", isAuthenticated, getEmails);
router.get("/emails/:id", isAuthenticated, getEmailById);
router.delete("/emails/", isAuthenticated, deleteEmailsByIds);
// router.post("/emails/mark-as-spam", isAuthenticated, markEmailAsSpam);
router.post("/emails/star", isAuthenticated, starEmails);
router.post("/emails/send-scheduled-email-now", isAuthenticated, sendScheduledEmailNow);

module.exports = router;
