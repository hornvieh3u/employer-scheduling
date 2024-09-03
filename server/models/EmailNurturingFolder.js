const mongoose = require('mongoose');
const schema = mongoose.Schema
const nurturingfolderSchema = schema({
    folderName: {
        type: String,
        unique: true,
        require: true
    },
    template: [{
        type: schema.Types.ObjectId,
        ref: 'sentOrscheduleEmail'
    }],
    userId: {
        type: String,
        index:true
    },
    adminId: {
        type: String,
        index:true
    }

},
    { timestamps: true }
)

module.exports = mongoose.model('nurturingFolder', nurturingfolderSchema)