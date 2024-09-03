const emailNurturing = require("../models/EmailNurturingCategory")
const Member = require('../models/Member')
const user = require('../models/User')

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

exports.category_list = (req, res) => {
    let adminId = process.env.ADMINID
    const userId = req.params.userId;
    emailNurturing
        .find({ $or: [{ userId: userId }, { adminId: adminId }] })
        .populate({
            path: 'folder',
            populate: {
                path: 'template',
                model: 'sentOrscheduleEmail'
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

exports.admin_category_list = (req, res) => {
    emailNurturing.find({ adminId: req.params.adminId })
        .populate({
            path: 'folder',
            populate: {
                path: 'template',
                model: 'sentOrscheduleEmail'
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

exports.addcategory = (req, res) => {
    var cat = {
        categoryName: req.body.categoryName,
        userId: req.params.userId,
        adminId: req.params.adminId
    }
    var category = new emailNurturing(cat);
    category.save((err, data) => {
        if (err) {
            res.send({ msg: "Folder name already exist!", success: false });
        }
        else {
            res.send({ msg: 'Folder  added successfully!', success: true })
        }
    })
}

exports.updateCategory = (req, res) => {
    emailNurturing.findByIdAndUpdate(req.params.categoryId, req.body)
        .exec((err, updateCat) => {
            if (err) {
                res.send({ error: 'category is not update', success: false })
            }
            else {
                res.send({ msg: "category is update successfully", success: true })
            }
        })
}



exports.removeCategory = (req, res) => {
    emailNurturing.findByIdAndRemove(req.params.categoryId)
        .exec((err, delData) => {
            if (err) {
                res.send({ error: 'Folder not removed!', success: true })
            }
            else {
                res.send({ msg: 'Folder removed successfully', success: true })
            }
        })
}

exports.tempList = (req, res) => {
    Member.find({ $and: [{ userId: req.params.userId }, { status: 'Active' }] })
        .select("firstName")
        .select("lastName")
        .select("primaryPhone")
        .select("email")
        .select("status")
        .exec((err, tempList) => {
            if (err) {
                res.send(err)
            }
            res.send(tempList)
        })
}

// exports.sendEmail = (req, res) => {
//     if (!req.body.subject || !req.body.template || !req.body.to) {
//         res.send({ error: "invalid input", success: false })
//     } else {
//         let attachment = req.files;

//         const attachments = attachment.map((file) => {
//             let content = Buffer.from(file.buffer).toString("base64")
//             return {
//                 content: content,
//                 filename: file.originalname,
//                 type: `application/${file.mimetype.split("/")[1]}`,
//                 disposition: "attachment"
//             }
//         });
//         const emailData = new Mailer({
//             from: req.body.from,
//             to: to,
//             subject: req.body.subject,
//             text: req.body.template,
//             html: req.body.html,
//             attachments: attachments
//         })
//         emailData.sendMail()
//             .then(resp => {
//                 var DT = TimeZone()
//                 var emailDetail = new emailSent(req.body)
//                 emailDetail.sent_date = DT.Date
//                 emailDetail.sent_time = DT.Time
//                 emailDetail.save((err, emailSave) => {
//                     if (err) {
//                         res.send({ error: 'email details is not save' })
//                     }
//                     else {
//                         emailSent.findByIdAndUpdate(emailSave._id, { userId: req.params.userId, email_type: 'sent', category: 'compose' })
//                             .exec((err, emailUpdate) => {
//                                 if (err) {
//                                     res.send({ error: 'user id is not update in sent email' })
//                                 }
//                                 else {
//                                     res.send({ message: "Email Sent Successfully", success: true, emailUpdate })
//                                 }
//                             })
//                     }
//                 })
//             }).catch(err => {
//                 res.send({ error: 'email not send', error: err })
//             })

//     }
// }