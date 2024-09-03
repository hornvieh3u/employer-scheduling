const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { Organization, OrganizationLocation } = require("../models/index/index");

exports.createOrganization = asyncHandler(async (req, res) => {
  try {
    const payload = req.body;
    payload.createdBy = req.user._id;
    payload.url = `https://www.mymanager.com/${payload.path}`;
    await Organization.create(payload);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.editOrganization = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    payload.updatedBy = req.user._id;
    if (payload.path) {
      payload.url = `https://www.mymanager.com/${payload.path}`;
    }
    await Organization.findByIdAndUpdate(mongoose.Types.ObjectId(id), { $set: payload });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.addOrganizationLocation = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    payload.organizationId = mongoose.Types.ObjectId(id);
    await OrganizationLocation.create(payload);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.deleteOrganizationLocation = asyncHandler(async (req, res) => {
  try {
    const { id, locationId } = req.params;
    const loc = await OrganizationLocation.findOne({
      organizationId: mongoose.Types.ObjectId(id),
      _id: mongoose.Types.ObjectId(locationId),
    });
    if (loc === null) {
      return res.status(404).send({ success: false, message: `Location not found` });
    }
    loc.delete();
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.updateOrganizationLocation = asyncHandler(async (req, res) => {
  try {
    const { id, locationId } = req.params;
    const loc = await OrganizationLocation.findOneAndUpdate(
      {
        organizationId: mongoose.Types.ObjectId(id),
        _id: mongoose.Types.ObjectId(locationId),
      },
      { $set: { ...req.body } }
    );
    if (loc === null) {
      return res.status(404).send({ success: false, message: `Location not found` });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getOrganizations = asyncHandler(async (req, res) => {
  try {
    const orgs = await Organization.aggregate([
      {
        $lookup: {
          from: "organization-locations",
          localField: "_id",
          foreignField: "organizationId",
          as: "locations",
        },
      },
    ]);
    return res.status(200).json(orgs);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getOrganizationById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const orgs = await Organization.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "organization-locations",
          localField: "_id",
          foreignField: "organizationId",
          as: "locations",
        },
      },
    ]);
    if (orgs === null) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    return res.status(200).json(orgs);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});
