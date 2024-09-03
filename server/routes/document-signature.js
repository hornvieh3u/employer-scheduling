const router = require("express").Router();

const {
  getSignatureByEmail,
  editDocumentSignature,
  uploadImage,
  addSignatureAndInitial,
  deleteUploadedFile,
} = require("../controllers/documentSignature");
const { singleUploadControl } = require("../middleware/upload");

router.post("/upload", singleUploadControl, uploadImage);
router.delete("/upload", deleteUploadedFile);
router.post("/signatures", addSignatureAndInitial);
router.put("/signatures", editDocumentSignature);
router.get("/signatures", getSignatureByEmail);

module.exports = router;
