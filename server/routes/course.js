const router = require("express").Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course");
const { singleUploadControl } = require("../middleware/upload");

router.post("/create", isAuthenticated,singleUploadControl, results, createCourse);
router.get("/", isAuthenticated, results, getCourses);
router.get("/courseId/:id", isAuthenticated, results, getCourse);
router.put("/courseId/:id", isAuthenticated,singleUploadControl, results, updateCourse);
router.delete("/courseId/:id", isAuthenticated, results, deleteCourse);

module.exports = router;
