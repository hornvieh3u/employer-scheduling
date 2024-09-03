const folderNur = require("../models/EmailNurturingFolder");
const nurturingCat = require('../models/EmailNurturingCategory')

exports.create_folder = (req, res) => {
    let nurtBody = req.body;
    nurtBody.userId = req.params.userId;
    var folderObj = new folderNur(nurtBody)
    folderObj.save((err, folder) => {
        if (err) {
            res.send({ msg: "Folder name already exist!", success: false });
        }
        else {
            nurturingCat.findByIdAndUpdate(req.params.catId, { $push: { folder: folder._id } })
                .exec((err, folderUpdate) => {
                    if (err) {
                        res.send({ msg: 'Folder not created!', success: false })
                    }
                    else {
                        res.send({ msg: 'Folder added successfully', success: true })
                    }
                })
        }
    })
}

exports.list_folders = async (req, res) => {
    await folderNur
        .find({ userId: req.params.userId })

        .exec((err, template_data) => {
            if (err) {
                res.send({ msg: "data not found", success: false });
            } else {
                res.send({ data: template_data, success: true });
            }
        });
};

exports.list_template = (req, res) => {
    folderNur
        .findById(req.params.folderId)
        .populate({
            path: "template",
        })
        .exec((err, template_data) => {
            if (err) {
                res.send({ msg: "nurturing template list not found", success: false });
            } else {
                res.send({ data: template_data, success: true });
            }
        });
};
exports.update_folder = (req, res) => {
    folderNur.findByIdAndUpdate(req.params.folderId, { $set: { folderName: req.body.folderName } })
        .exec((err, updateFolder) => {
            if (err) {
                res.send({ msg: 'nurturing folder is not update', success: false })
            }
            else {
                res.send({ msg: 'Folder updated successfully', success: true })
            }
        })
}

exports.delete_folder = (req, res) => {
    folderNur.findOneAndRemove({ _id: req.params.folderId }, (err, delFolder) => {
        if (err) {
            res.send({ msg: 'nurturing folder is not removed', success: false })
        }
        else {
            nurturingCat.updateOne({ "folder": req.params.folderId }, { $pull: { "folder": req.params.folderId } }, (err, data) => {
                if (err) {
                    res.send({ msg: 'Folder not removed', success: false })
                }
                else {
                    res.send({ msg: 'Folder removed successfully', success: true })
                }
            })
        }
    })
}

