const mongoose = require("mongoose");
const schema = mongoose.Schema

const emailAuthSchema = new schema({
    auth_key:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        index:true
    }
})

module.exports = mongoose.model("email_auth_key", emailAuthSchema);

