const user = require('../models/user')
const emailCompose = require('../models/EmailComposeCategory')
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// // const sgMail = require('sendgrid-v3-node');
// const AuthKey = require('../models/EmailKey')
// sgMail.setApiKey(process.env.email);
function TimeZone() {
    const str = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const date_time = str.split(',')
    const date = date_time[0]
    const time = date_time[1]
    return { Date: date, Time: time }
}

exports.userEmailList = (req, res) => {
    user.findOne({ _id: req.params.userId })
        .select('bussinessEmail')
        .exec((err, userEmail) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send(userEmail)
            }
        })
}


// exports.smartList = (req, res) => {
//     Member.aggregate([
//         { $match: { $and: [{ userId: req.params.userId }] } },
//         {
//             $group: {
//                 _id: "$studentType",
//                 "count": { "$sum": 1 },
//                 list: { $push: { firstName: "$firstName", lastName: "$lastName", primaryPhone: "$primaryPhone", email: "$email", status: "$status", _id: "$_id" } },
//             }
//         }
//     ]).exec((err, sList) => {
//         if (err) {
//             res.send({ code: 400, msg: 'smart list not found', success: false })
//         }
//         else {
//             res.send({ code: 200, msg: sList, success: true })
//         }
//     })
// }

exports.category_list = async (req, res) => {
    let adminId = process.env.ADMINID
    const userId = req.params.userId;
    await emailCompose
        .find({ $or: [{ userId: userId }, { adminId: adminId }] })
        .populate({
            path: 'folder',
            populate: {
                path: 'template',
                model: 'email_template'
            }
        })
        .sort({ categoryName: 1 })
        .exec((err, categoryList) => {
            if (err) {
                res.send({ msg: 'compose category is not found', success: false })
            }
            else {
                res.send({ data: categoryList, success: true })
            }
        })
}
exports.admin_category_list = async (req, res) => {
    await emailCompose.find({ adminId: req.params.adminId })
        .populate({
            path: 'folder',
            populate: {
                path: 'template',
                model: 'email_template'
            }
        })
        .sort({ categoryName: 1 })
        .exec((err, categoryList) => {
            if (err) {
                res.send({ msg: 'compose category is not found', success: false })
            }
            else {
                res.send({ data: categoryList, success: true })
            }
        })
}
exports.addCategory = (req, res) => {
    var cat = {
        categoryName: req.body.categoryName,
        userId: req.params.userId,
        adminId: req.params.adminId
    }
    var category = new emailCompose(cat);
    category.save((err, data) => {
        if (err) {
            res.send({ msg: "Folder name already exist!", success: false });
        }
        else {
            res.send({ msg: 'Folder added successfully', success: true })
        }
    })
}

exports.updateCategory = (req, res) => {
    // catBody = req.body
    emailCompose.findByIdAndUpdate(req.params.categoryId, req.body)
        .exec((err, updateCat) => {
            if (err) {
                res.send({ msg: 'Folder is not update', success: false })
            }
            else {
                res.send({ msg: "Folder  updated successfully!", success: true })
            }
        })
}

exports.removeCategory = (req, res) => {
    var categoryId = req.params.categoryId;
    emailCompose.findByIdAndDelete(categoryId, (err, delData) => {
        if (err) {
            res.send({ msg: 'Folder is not delete', success: false })
        }
        else {
            res.send({ msg: 'Folder  removed successfully!', success: true })
        }
    })
}