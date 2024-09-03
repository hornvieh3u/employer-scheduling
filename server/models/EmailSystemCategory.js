const mongoose = require('mongoose');
const schema = mongoose.Schema
const systemCategorySchema = schema({
    categoryName: {
        type: String,
        // unique: true,
        require: true
    },
    category: {
        type: String,
        default: 'system'
    },
    folder: [{
        type: schema.Types.ObjectId,
        ref: 'systemFolder'
    }],
    adminId: {
        type: String,
        index:true
    },
    userId: {
        type: String,
        index:true
    },
    createdBy: {
        type: String
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('system_category', systemCategorySchema)