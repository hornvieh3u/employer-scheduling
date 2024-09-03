const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { DocumentSignature } = require("../models/index/index");
const GoogleCloudStorage = require("../Utilities/googleCloudStorage");

// get -> get all signature from email address
exports.getSignatureByEmail = asyncHandler(async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: "Bad Request! email is required." });
  }
  const data = await DocumentSignature.aggregate([
    { $match: { email } },
    {
      $project: {
        __v: 0,
      },
    },
  ]);
  if (Array.isArray(data) && data.length > 0) {
    return res.status(200).json({ success: "true", message: "Signatures found", details: data });
  }
  return res.status(200).json({ success: "false", message: "Signiture not found" });
});

// upload images
exports.uploadImage = asyncHandler(async (req, res) => {
  try {
    const url = await GoogleCloudStorage.upload(req.file);
    res.send({
      success: true,
      message: "Image uploaded successfully",
      url,
    });
  } catch (error) {
    res.send({ success: false, message: error.message.replace(/\\"/g, "") });
  }
});

// delet image
exports.deleteUploadedFile = asyncHandler(async (req, res) => {
  try {
    const { url } = req.body;
    const file = url.split(`${process.env.GCS_BUCKET}/`)[1];
    await GoogleCloudStorage.delete(file);
    res.send({ succsess: true });
  } catch (error) {
    res.send({ success: false, message: error.message.replace(/\\"/g, "") });
  }
});

// create -> add to document-signatures by email address
exports.addSignatureAndInitial = asyncHandler(async (req, res) => {
  try {
    const data = await DocumentSignature.create(req.body);

    res.send({
      success: true,
      message: "Signature uploaded successfully",
      data,
    });
  } catch (error) {
    res.send({ success: false, message: error.message.replace(/\\"/g, "") });
  }
});

// edit -> edit signaturePath , initialPath for objectId
exports.editDocumentSignature = asyncHandler(async (req, res) => {
  const {
    signatureId, isSignature, id, isInitial
  } = req.query;

  try {
    const signature = await DocumentSignature.findById(mongoose.Types.ObjectId(signatureId));

    if (isSignature === "true") {
      if (id > 0) {
        const sign = signature.signatures.find((x) => x.id.toString() === id);

        if (sign.path) {
          const file = sign.path.split(`${process.env.GCS_BUCKET}/`)[1];
          await GoogleCloudStorage.delete(file);
        }
      }
    }
    if (isInitial === "true") {
      if (id > 0) {
        const initial = signature.signatures.find((x) => x.id.toString() === id).initials;
        if (initial.path) {
          const fileName = initial.path.split(`${process.env.GCS_BUCKET}/`)[1];
          await GoogleCloudStorage.delete(fileName);
        }
      }
    }
    if (isSignature === "false" && isInitial === "false") {
      if (id > 0) {
        const stamp = signature.stamps.find((x) => x.id.toString() === id);
        if (stamp) {
          const fileName = stamp.path.split(`${process.env.GCS_BUCKET}/`)[1];
          await GoogleCloudStorage.delete(fileName);
        }
      }
    }

    const updated = await DocumentSignature.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(signatureId) },
      req.body,
      { new: true }
    );
    if (updated) {
      return res.status(200).json({ success: true, message: "update successful", data: updated });
    }
    return res.status(404).json({ success: false, message: `Signature not found` });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/\\"/g, ""), success: false });
  }
});
