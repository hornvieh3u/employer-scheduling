const mongoose = require('mongoose');
const schema =  mongoose.Schema
const libraryCategorySchema = schema({
   categoryName:{
       type:String,
       unique:true,
       require:true
   },
   category:{
    type:String,
    default:'library'
   },
   folder:[{
       type:schema.Types.ObjectId,
       ref:'libraryFolder'
   }],
   userId:{
       type:String,
       index:true
   }
},
{ timestamps:true }
)

module.exports = mongoose.model('library_category', libraryCategorySchema)