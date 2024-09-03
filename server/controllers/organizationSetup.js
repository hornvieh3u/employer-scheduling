const userModal = require("../models/User")
const cloudUrl = require("../Utilities/googleCloudStorage");

exports.read =(req, res) => {
    var user_Id = req.params.userId
    console.log(req.params)
    userModal.findById(user_Id)
    .exec((err,data)=>{
        if(err){
            res.send({error:'member list is not found'});
        }
        else{
            res.send(data);
        }
    })
};

exports.update = (req, res) => {
    const user_id = req.params.userId;
    userModal.findByIdAndUpdate({_id:user_id},req.body).exec((err,data)=>{
        if(err){
            res.send({error:'user is not update'})
        }
        else{
            if(req.file){
                cloudUrl.imageUrl(req.file).then((userImageUrl)=>{
                  userModal.findByIdAndUpdate(data._id,{$set:{logo:userImageUrl}})
                  .then((response) => {
                      res.send({msg: 'user details with profile is update'})
                  }).catch((err) => {
                      res.send()
                  })
                }).catch((error)=>{
                    res.send({error:'image url is not create'})
                })
            }
           else{
               res.send({msg: 'user details is update'})
           } 
        }
    })
};

// exports.updatemember = (req, res) => {
//     var memberID = req.params.memberID;
//     addmemberModal.updateOne({ _id : memberID },req.body).exec((err, data) => {
//         if (err) {
//             res.send({ error: 'member is not update' })
//         }
//         else{
//         if(req.file){
//             cloudinary.config({
//                 cloud_name: process.env.cloud_name,
//                 api_key: process.env.cloud_api_key,
//                 api_secret: process.env.cloud_api_secret
//             });
//             var path = req.file.path;
//             var filename = req.file.originalname;
//             var uniqueFilename = filename+(Date.now())

//             cloudinary.uploader.upload(
//                 path,
//                 { public_id: `member_image/${uniqueFilename}`, tags: `member_image` }, // directory and tags are optional
//                 function (err, image) {
//                     if (err) return res.send(err)
//                     const fs = require('fs')
//                     fs.unlinkSync(path)
//                     addmemberModal.findByIdAndUpdate(data._id, { $set:{memberprofileImage: image.url } })
//                         .then((response) => {
//                             res.send('member details and profile is update')
//                     });
//                 }
//             );

//         }
//         else {
//             res.send({ msg: 'member is update' })
//         }
//     }
//     })
// }


// exports.orgInfo = async (req, res) => {
//     const id = req.params.orgIid
//     organization.findById(id)
//         .then((result) => {
//             res.json(result)
//         }).catch((err) => {
//             res.send(err)
//         });
// };

// exports.remove = async (req, res) => {
//     const id = req.params.orgIid
//     organization.deleteOne({ _id: id })
//         .then((resp) => {
//             res.json("campaign type has been deleted successfully")
//         }).catch((err) => {
//             res.send(err)
//         })
// };