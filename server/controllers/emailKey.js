const email_auth = require("../models/EmailKey")

exports.add_key = async(req,res)=>{
var auth = new email_auth({
    auth_key:req.body.key,
    userId:req.params.userId
 })
 try{
    var Auth = await auth.save()
    res.send({msg:'email auth key add succcessfully'})
 }catch(err){
     res.send(err)
 }
}