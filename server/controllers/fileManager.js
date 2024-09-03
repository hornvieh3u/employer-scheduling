const GoogleCloudStorage = require("../Utilities/googleCloudStorage");
const File = require("../models/File");
const pizzip = require("pizzip");
const fetch = require("node-fetch");
const Docxtemplater = require("docxtemplater");
const DocxMerger = require("docx-merger");

exports.uploadFile = async (req, res) => {
  try {
    const { id } = req.body;

    if (req.file.size) {
      const url = await GoogleCloudStorage.upload(req.file);
    }

    const newFile = new File({
      userId: req.body.userId,
      filename: req.file.originalname,
      type: req.body.type === "directory" ? "directory" : req.file.mimetype,
      size: req.file.size,
      url: url,
      path: req.body.path,
      lastSeen: new Date(),
    });
    await newFile.save();
    return res.json(newFile);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const { userId, path } = req.body;
    const files = await File.find({ userId, path });
    return res.json(files);
  } catch (err) {
    return res.status(400).send({ msg: err.message.replsace(/"/g, ""), success: false });
  }
};

exports.addNewFolder = async (req, res) => {
  try {
    const { path, name, userId } = req.body;
    const oldFolder = await File.findOne({
      path,
      filename: name,
      type: "directory",
    });

    if (oldFolder) {
      return res.status(400).send({ msg: "Folder with same name already exist" });
    }

    const newFolder = new File({
      userId: userId,
      filename: name,
      type: "directory",
      path: path,
      lastSeen: new Date(),
    });
    await newFolder.save();

    res.status(200).json({ msg: "success" });
  } catch (err) {
    return res.status(400).send({ msg: err.message.replace(/"/g, ""), success: false });
  }
};

exports.renameFolder = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { folderName } = req.body;
    console.log(fileId);
    await File.findByIdAndUpdate(fileId, {
      filename: folderName,
    });
    return res.json({ succes: true, msg: "folder name updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: err.message.replace(/"/g, ""), success: false });
  }
};

exports.deleteFolder = async (req, res) => {
  try {
    const { fileId } = req.params;

    await File.findByIdAndRemove(fileId);
    return res.json({ succes: true, msg: "folder deleted successfully" });
  } catch (err) {
    return res.status(400).send({ msg: err.message.replace(/"/g, ""), success: false });
  }
};

exports.mergeFile = async (req, res) => {
  try {
    const { fileUrl, replaceFields } = req.body;
    let docs = [];
    for (field of replaceFields) {
      docs.push(replaceField(fileUrl, field))
    }
    const result = await Promise.all(docs);
    return res.json(result)
  }
  catch (err) {
    console.log(err)
    return res.status(400).send({ msg: err.message.replace(/"/g, ""), success: false });
  }
}

const replaceField = async (url, field) => {
  let response = await fetch(url);
  response = await response.buffer();
  const zip = new pizzip(response);
  const doc = new Docxtemplater(zip, { linebreaks: true });
  doc.render(field);
  let buf = doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });
  return buf;
}
