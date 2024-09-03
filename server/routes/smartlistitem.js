const router = require("express").Router();
const {
  getSmartListItem,
  createSmartListItem,
  deleteSmartListItem,
  updateSmartListItem
} = require("../controllers/smartlistitem");
const isAuthenticated = require("../middleware/auth");

router.post("/create", isAuthenticated, createSmartListItem)
router.get("/get/:listId", isAuthenticated, getSmartListItem);
router.delete("/delete/:itemId", isAuthenticated, deleteSmartListItem);
router.put("/update/:itemId", isAuthenticated, updateSmartListItem);
module.exports = router;
