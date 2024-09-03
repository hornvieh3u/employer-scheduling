const router = require("express").Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const {
  createRole,
  getAllRole,
  getRoleById,
  deleteById,
  updateById,
} = require("../controllers/role");

router.post("/create", isAuthenticated, results, createRole);
router.get("/", isAuthenticated, results, getAllRole);
router.get("/roleId/:id", isAuthenticated, results, getRoleById);
router.delete("/roleId/:id", isAuthenticated, results, deleteById);
router.put("/roleId/:id", isAuthenticated, results, updateById);

module.exports = router;
