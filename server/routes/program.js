const express = require("express");
const router = express.Router();
const { singleUploadControl } = require("../middleware/upload");
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const { create, read, programs_detail, update, remove } = require("../controllers/program");

router.post("/add_program/:userId", results, isAuthenticated, singleUploadControl, create);
router.get("/list_of_program/:userId", results, isAuthenticated, read);
router.get("/program_details/:proId", results, isAuthenticated, programs_detail);
router.put("/update_program/:proId", results, isAuthenticated, singleUploadControl, update);
router.delete("/delete_program/:proId", results, isAuthenticated, remove);

module.exports = router;
