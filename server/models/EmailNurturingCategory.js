const mongoose = require('mongoose');
const schema = mongoose.Schema
const nurturingCategorySchema = schema({
        categoryName: {
            type: String,
            // unique: true,
            required: true
        },
        category: {
            type: String,
            default: 'nurturing'
        },
        folder: [{
            type: schema.Types.ObjectId,
            ref: 'nurturingFolder'
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

module.exports = mongoose.model('nurturing_category', nurturingCategorySchema)