const mongoose = require("mongoose");
const schema = mongoose.Schema

const smartlistSchema = new schema({
    smartlistname: {
        type: String,
        trim: true,
        required: true,
        // unique: true,
    },
    smartlists: {
        type: Array,
    },
    criteria: {
        type: Object
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

module.exports = mongoose.model("smartList", smartlistSchema);

