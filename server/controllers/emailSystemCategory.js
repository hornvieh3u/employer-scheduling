const emailSystem = require("../models/EmailSystemCategory")
const user = require('../models/user')
const emailSent = require('../models/EmailSentSave')
const Mailer = require("../helpers/Mailer");
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
function TimeZone() {
    const str = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const date_time = str.split(',')
    const date = date_time[0]
    const time = date_time[1]
    return { Date: date, Time: time }
}
exports.category_list = (req, res) => {
    const userId = req.params.userId;
    let adminId = process.env.ADMINID
    emailSystem
        .find({ $or: [{ userId: userId }, { adminId: adminId }] })
        .populate({
            path: 'folder',
            populate: {
                path: 'template',
                model: 'sentOrscheduleEmail'
            }
        })
        .sort({categoryName:1})
        .exec((err, categoryList) => {
            if (err) {
                res.send({ error: 'Folder not found!', success: false })
            }
            else {
                res.send({ data: categoryList, success: true })
            }
        })
}

exports.admin_category_list = (req, res) => {
    const adminId = req.params.adminId;
    emailSystem
        .find({ adminId: adminId })
        .populate({
            path: 'folder',
            populate: {
                path: 'template',
                model: 'sentOrscheduleEmail'
            }
        })
        .sort({categoryName:1})
        .exec((err, categoryList) => {
            if (err) {
                res.send({ error: 'Folder not found!', success: false })
            }
            else {
                res.send({ data: categoryList, success: true })
            }
        })
}

exports.addCategory = (req, res) => {
    const userId = req.params.userId;
    const adminId = req.params.adminId;
    var cat = {
        categoryName: req.body.categoryName,
        userId: userId,
        adminId: adminId
    }
    var category = new emailSystem(cat);
    category.save((err, data) => {
        if (err) {
            res.send({ msg: "Folder name already exist!", success: false });
        }
        else {
            res.send({ msg: 'folder added successfully', success: true })
        }
    })
}

exports.updateCategory = (req, res) => {
    const adminId = req.params.adminId
    const userId = req.params.userId;
    const folderId = req.params.categoryId
    emailSystem
        .updateOne({ _id: folderId, $and: [{ userId: userId }, { adminId: adminId }] }, { $set: req.body })
        .exec((err, updateFolder) => {
            if (err) {
                res.send({ msg: 'Folder not updated!', success: false })
            }
            else {
                if (updateFolder.n < 1) {
                    return res.send({
                        msg: "This is system generated folder Only admin can update",
                        success: false,
                    });
                }
                res.send({ msg: "Folder update successfully", success: true })
            }
        })
}

exports.removeCategory = (req, res) => {
    emailSystem.findByIdAndRemove(req.params.categoryId)
        .exec((err, delData) => {
            if (err) {
                res.send({ msg: 'Folder not removed!', success: false })
            }
            else {
                res.send({ msg: 'Folder removed successfully', success: true })
            }
        })
}

exports.sendEmail = (req, res) => {
    try {
        if (!req.body.subject || !req.body.template || !req.body.to) {
            res.send({ error: "invalid input", success: false })
        } else {
            let attachment = req.files;
            const attachments = attachment.map((file) => {
                let content = Buffer.from(file.buffer).toString("base64")
                return {
                    content: content,
                    filename: file.originalname,
                    type: `application/${file.mimetype.split("/")[1]}`,
                    disposition: "attachment"
                }
            });
            const emailData = new Mailer({
                sendgrid_key: process.env.SENDGRID_API_KEY,
                to: req.body.to,
                from: process.env.from_email,
                //from_name: 'noreply@gmail.com',
                subject: req.body.subject,
                html: req.body.template,
                attachments: attachments
            })

            emailData.sendMail()
                .then(resp => {
                    var DT = TimeZone()
                    var emailDetail = new emailSent(req.body)
                    emailDetail.sent_date = DT.Date
                    emailDetail.sent_time = DT.Time


                    emailDetail.save((err, emailSave) => {
                        if (err) {
                            res.send({ error: 'email details is not save' })
                        }
                        else {
                            emailSent.findByIdAndUpdate(emailSave._id, { userId: req.params.userId, email_type: 'sent', category: 'system' })
                                .exec((err, emailUpdate) => {
                                    if (err) {
                                        res.send({ error: 'user id is not update in sent email' })
                                    }
                                    else {
                                        res.send({ message: "Email Sent Successfully", success: true, emailUpdate })
                                    }
                                })
                        }
                    })
                })

        }
    }
    catch (err) {
        res.send({ msg: 'email not send', success: false })
    }
}