const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

// UPload Handler
const { upload } = require("../lib/upload");
const { singleUploadControl, singleUploadToServerControl } = require("../middleware/upload");
const {
  uploadFile,
  getFiles,
  addNewFolder,
  renameFolder,
  deleteFolder,
  mergeFile
} = require("../controllers/fileManager");

// Create event
router.post("/fileupload/", isAuthenticated, singleUploadControl, uploadFile);
router.post("/get-files/", isAuthenticated, getFiles);
router.post("/new-folder/", isAuthenticated, addNewFolder);
router.post("/rename-folder/:fileId", isAuthenticated, renameFolder);
router.delete("/delete-folder/:fileId", isAuthenticated, deleteFolder);
router.post("/merge-file/", mergeFile);

module.exports = router;