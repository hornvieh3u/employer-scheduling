const router = require("express").Router();
const {
  createInvoice,
  getInvoices,
  updateInvoiceById,
  getInvoiceById,
  deleteInvoiceById,
} = require("../controllers/invoice");
const isAuthenticated = require("../middleware/auth");

router.post("/", isAuthenticated, createInvoice);
router.get("/", isAuthenticated, getInvoices);
router.get("/:id", isAuthenticated, getInvoiceById);
router.patch("/:id", isAuthenticated, updateInvoiceById);
router.delete("/:id", isAuthenticated, deleteInvoiceById);

module.exports = router;
