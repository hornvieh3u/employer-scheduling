const router = require("express").Router();
const {
  createOrganization,
  editOrganization,
  addOrganizationLocation,
  deleteOrganizationLocation,
  updateOrganizationLocation,
  getOrganizations,
  getOrganizationById,
} = require("../controllers/organization");
const isAuthenticated = require("../middleware/auth");

router.post("/", isAuthenticated, createOrganization);
router.put("/:id", isAuthenticated, editOrganization);
router.post("/:id/location", isAuthenticated, addOrganizationLocation);
router.delete("/:id/location/:locationId", isAuthenticated, deleteOrganizationLocation);
router.patch("/:id/location/:locationId", isAuthenticated, updateOrganizationLocation);
router.get("/", isAuthenticated, getOrganizations);
router.get("/:id", isAuthenticated, getOrganizationById);

module.exports = router;
