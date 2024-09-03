const mongoose = require('mongoose');
const schema = mongoose.Schema
const EmailSchema = schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: Array,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    template: {
        type: String
    },
    design: {
        type: String
    },
    days: {
        type: Number
    },
    days_type: {            //after/before
        type: String
    },
    content_type: {
        type: String
    },
    category: {         //sent/schedule
        type: String,
    },
    sent_date: {
        type: String,
    },
    sent_time: {
        type: String,
    },
    immediately: {
        type: Boolean
    },
    isPlaceHolders: {
        type: Boolean
    },
    repeat_mail: {
        type: String
    },
    createdBy: {
        type: String,
    },
    is_Favorite: {
        type: Boolean,
        default: false
    },
    attachments: {
        type: Array
    },
    smartLists:
    {
        type: Array
    },
    userId: {
        type: String,
        index:true
    },
    adminId: {
        type: String,
        index:true
    },
    folderId: {
        type: String,
        index:true
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('email_template', EmailSchema)