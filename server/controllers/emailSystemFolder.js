const folderSystem = require("../models/EmailSystemFolder");
const systemCat = require('../models/EmailSystemCategory')

exports.create_folder = (req, res) => {
    const userId = req.params.userId;
    const adminId = req.params.adminId;
    var folder = {
        folderName: req.body.folderName,
        userId: userId,
        adminId: adminId
    }
    var folderObj = new folderSystem(folder)
    folderObj.save((err, folder) => {
        if (err) {
            res.send({ msg: "Folder name already exist!", success: false });
        }
        else {
            systemCat.findByIdAndUpdate(req.params.catId, { $push: { folder: folder._id } })
                .exec((err, folderUpdate) => {
                    if (err) {
                        res.send({ msg: 'system folder id is not push in category', success: false })
                    }
                    else {
                        res.send({ msg: 'system folder create successfully', success: true })
                    }
                })
        }
    })
}

exports.list_folders = async (req, res) => {
    await folderSystem
        .find({ userId: req.params.userId })

        .exec((err, template_data) => {
            if (err) {
                res.send({ msg: "data not found", success: false });
            } else {
                res.send({ data: template_data, success: true });
            }
        });
};

exports.admin_list_folders = async (req, res) => {
    await folderSystem
        .find({ adminId: req.params.adminId })

        .exec((err, template_data) => {
            if (err) {
                res.send({ msg: "data not found", success: false });
            } else {
                res.send({ data: template_data, success: true });
            }
        });
};

exports.list_template = (req, res) => {
    folderSystem
        .findById(req.params.folderId)
        .populate({
            path: "template",
        })
        .exec((err, template_data) => {
            if (err) {
                res.send({ msg: "template list not found", success: false });
            } else {
                res.send({ data: template_data, success: true });
            }
        });
};

exports.update_folder = (req, res) => {
    const userId = req.params.userId;
    const adminId = req.params.adminId;
    const folderId = req.params.folderId
    folderSystem.findByIdAndUpdate(folderId, { $set: req.body })
        .exec((err, updateFolder) => {
            if (err) {
                res.send({ msg: 'system folder updated', success: false })
            }
            else {
                res.send({ msg: 'system folder updated successfully', success: true })
            }
        })
}

exports.delete_folder = (req, res) => {
    const userId = req.params.userId;
    const adminId = req.params.adminId;
    folderSystem.findOneAndRemove({ _id: req.params.folderId }, (err, delFolder) => {
        if (err) {
            res.send({ msg: 'system folder is not remove', success: false })
        }
        else {
            systemCat.updateOne({ "folder": req.params.folderId }, { $pull: { "folder": req.params.folderId } }, (err, data) => {
                if (err) {
                    res.send({ msg: 'system folder not removed!', success: false })
                }
                else {
                    res.send({ msg: 'folder removed successfully', success: true })
                }
            })
        }
    })
}