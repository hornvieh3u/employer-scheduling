/* eslint-disable consistent-return */
require("dotenv").config();
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const moment = require("moment");
const crypto = require("crypto");
const GoogleCloudStorage = require("../Utilities/googleCloudStorage");

const { Document, DocumentRecipient } = require("../models/index/index");

exports.uploadAndSaveDocument = asyncHandler(async (req, res) => {
  try {
    const url = await GoogleCloudStorage.upload(req.file);
    const payload = {
      name: req.file.originalname,
      cloudUrl: url,
      type: req.body.type,
      userId: req.user._id,
    };
    const data = await Document.create(payload);
    const uploadedDocuments = {
      id: data._id,
      name: data.name,
      url: data.cloudUrl,
      type: data.type,
    };
    res.send({
      success: true,
      message: "Document uploaded successfully",
      uploadedDocuments,
    });
  } catch (error) {
    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.deleteAndDestroyDocumentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const document = await Document.findById(id);
    const fileName = document.cloudUrl.split(`${process.env.GCS_BUCKET}/`)[1];
    await GoogleCloudStorage.delete(fileName);
    await document.delete();
    await DocumentRecipient.findOneAndDelete({
      documentId: mongoose.Types.ObjectId(id),
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.deleteAndDestroyMultipleDocuments = asyncHandler(async (req, res) => {
  let { ids } = req.body;
  ids = ids.map((id) => mongoose.Types.ObjectId(id));
  try {
    const documents = await Document.find({
      _id: { $in: ids },
    });
    if (documents.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: `No matching documents found, hence nothing deleted` });
    }
    const promise = [];
    documents.forEach((document) => {
      const fileName = document.cloudUrl.split(`${process.env.GCS_BUCKET}/`)[1];
      const del = GoogleCloudStorage.delete(fileName);
      promise.push(del);
    });
    Promise.all(promise);
    await Document.deleteMany({
      _id: { $in: ids },
    });
    await DocumentRecipient.deleteMany({
      documentId: { $in: ids },
    });
    if (documents.length !== ids.length) {
      return res.status(200).json({
        success: true,
        message: `Some of the documents where not found, hence only matching documents deleted deleted`,
      });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getAllDocuments = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  try {
    const data = await DocumentRecipient.aggregate([
      {
        $match: {
          userId,
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
      {
        $lookup: {
          from: "documents",
          localField: "documentId",
          foreignField: "_id",
          as: "documentDetails",
          pipeline: [
            {
              $project: {
                name: 1,
                type: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$documentDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    return res.status(200).json(data);
  } catch (error) {
    return res.send({
      success: false,
      message: error.message.replace(/"/g, ""),
    });
  }
});

exports.getDocumentById = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  try {
    const data = await Document.aggregate([
      {
        $match: {
          userId,
          _id: mongoose.Types.ObjectId(id),
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
      {
        $lookup: {
          from: "document-recipients",
          localField: "_id",
          foreignField: "documentId",
          as: "documentDetails",
          pipeline: [
            {
              $project: {
                __id: 0,
                documentId: 0,
                documentUrl: 0,
                userId: 0,
                __v: 0,
                recipients: {
                  hashCode: 0,
                },
              },
            },
          ],
        },
      },
    ]);
    if (Array.isArray(data) && data.length > 0) {
      return res.status(200).json(data[0]);
    }
    return res.status(404).json({ message: "Document not found" });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message.replace(/"/g, ""),
    });
  }
});

exports.getReceivedDocuments = asyncHandler(async (req, res) => {
  const { email } = req.user;
  try {
    const data = await DocumentRecipient.aggregate([
      {
        $match: {
          $and: [{ "recipients.email": email }, { isSent: true }],
        },
      },
      {
        $project: {
          __v: 0,
          recipients: {
            hashCode: 0,
          },
        },
      },
      {
        $lookup: {
          from: "documents",
          localField: "documentId",
          foreignField: "_id",
          as: "documentDetails",
          pipeline: [
            {
              $project: {
                name: 1,
                type: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$documentDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getDocumentByHashCode = asyncHandler(async (req, res) => {
  const { hashCode } = req.query;
  if (!hashCode) {
    return res.status(400).json({ message: "Bad Request! hashCode is required." });
  }

  let data = await DocumentRecipient.aggregate([
    {
      $match: {
        recipients: {
          $elemMatch: {
            hashCode,
          },
        },
      },
    },
  ]);
  // eslint-disable-next-line prefer-destructuring
  data = data[0];
  if (Array.isArray(data.recipients) && data.recipients.length === 0) {
    return res.status(404).json({ message: "Not found!" });
  }
  return res.status(200).json(data);
});

exports.generateToken = asyncHandler(async (req, res) => {
  const { hashCode } = req.query;
  if (!hashCode) {
    return res.status(400).json({ message: "Bad Request! hashCode is required." });
  }
  let data = await DocumentRecipient.aggregate([
    {
      $match: {
        recipients: {
          $elemMatch: {
            hashCode,
          },
        },
      },
    },
  ]);
  // eslint-disable-next-line prefer-destructuring
  data = data[0];
  if (Array.isArray(data.recipients) && data.recipients.length === 0) {
    return res.status(404).json({ message: "Not found!" });
  }
  // generate token

  const token = crypto.randomBytes(32).toString("hex");
  // save token with time stamp on db for recipient

  const auth = {
    token,
    expireTime: moment().add(20, "m"),
  };

  const specificRecipient = data.recipients.find((x) => x.hashCode === hashCode);
  const recipient = { ...specificRecipient, auth };
  const otherRecipients = data.recipients.filter((x) => x.hashCode !== hashCode);
  const document = { recipients: [...otherRecipients, recipient] };
  const { documentId } = data;
  const updatedDoc = await DocumentRecipient.findOneAndUpdate({ documentId }, document, {
    new: true,
  });
  if (updatedDoc) {
    return res.status(200).json({
      success: true,
      recipient: updatedDoc.recipients.find((x) => x.hashCode === hashCode),
    });
  }
  return res.status(404).json({ success: false, message: `Recipient not found` });
});
