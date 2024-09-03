const router = require("express").Router();
const { singleUploadControl } = require("../middleware/upload");

const { uploadFile } = require("../controllers/utill");
// UPload Handler
// const { upload } = require("../lib/upload");

router.post("/upload", singleUploadControl, uploadFile);

module.exports = router;
