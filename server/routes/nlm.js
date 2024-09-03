const router = require("express").Router();
const {
  loginAdmin,
  createAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  users,
  deleteUser,
  banUser,
} = require("../controllers/nlm");

const { signupValidator } = require("../validators/nlm/auth");
const results = require("../validators");

// Auth
router.post("/login", loginAdmin);

// Admin
router.post("/admin", signupValidator, results, createAdmin);
router.get("/admin", getAdmin);
router.patch("/admin/:id", signupValidator, results, updateAdmin);
router.delete("/admin/:id", deleteAdmin);

// Users
router.get("/users", users);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id", banUser);

module.exports = router;
