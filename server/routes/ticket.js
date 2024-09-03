const express = require("express");

const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const {
  createTicket,
  updateTicketMessage,
  getAllTicketsByUserId,
  getTicketById,
  addNewMessage,
  replyMessage,
  updateBulkTickets,
} = require("../controllers/ticket");

router.post("/new", isAuthenticated, createTicket);
router.put("/:ticketId", isAuthenticated, updateTicketMessage);
router.get("/all/:userId", isAuthenticated, getAllTicketsByUserId);
router.get("/:ticketId", isAuthenticated, getTicketById);
router.post("/message", isAuthenticated, addNewMessage);
router.post("/reply", replyMessage);
router.post("/bulk-update", isAuthenticated, updateBulkTickets);
// TODO: gettickets by status, update ticket message.

module.exports = router;
