const mongoose = require('mongoose');
const schema = mongoose.Schema
const EmailSchema = schema({
    from: {
        type: String,
        require: true
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
    days_type: {        //after/before
        type: String
    },
    immediately: {
        type: Boolean
    },
    isPlaceHolders: {
        type: Boolean
    },
    content_type: {
        type: String
    },
    sent_date: {
        type: String,
    },
    sent_time: {
        type: String,
    },
    category: {         //compose/nurturing/system
        type: String,
    },
    email_type: {       //sent/scheduled
        type: String,
    },
    // email_auth_key: {
    //     type: String,
    //     required: true
    // },
    userId: {
        type: String,
        index:true
    },
    folderId: {
        type: String,
        index:true
    },
    createdBy: {
        type: String,
    },
    adminId: {
        type: String,
        index:true
    },
    templete_Id: {
        type: String,
        index:true
    },
    is_Favorite: {
        type: Boolean,
        default: false
    },
    is_Sent: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isTemplate: {
        type: Boolean,
        default: false
    },
    attachments: {
        type: Array
    },
    smartLists:
        { type: Array },
    // [{
    //     stdtype: String,
    //     smId: String,
    //     smrtList: Array
    // }]
    inActiveUsers: [
        {
          type: schema.Types.ObjectId,
          ref: "User",
        },
      ],
},
    { timestamps: true }
)

module.exports = mongoose.model('sentOrscheduleEmail', EmailSchema)