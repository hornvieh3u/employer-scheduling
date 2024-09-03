const router = require("express").Router();

const {
  newProject,
  updateProject,
  deleteProject,
  getProjects,
  getProject,
} = require("../controllers/project");
const {
  newProjectValidator,
  updateProjectValidator,
  deleteProjectValidator,
  getProjectValidator,
} = require("../validators/project");
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");

router.post("/", isAuthenticated, newProjectValidator, results, newProject);

router.patch("/:id", isAuthenticated, updateProjectValidator, results, updateProject);

router.patch("/delete/:id", isAuthenticated, deleteProjectValidator, results, deleteProject);

router.get("/", isAuthenticated, getProjects);

router.get("/:id", isAuthenticated, getProjectValidator, results, getProject);

module.exports = router;
