const libFolder = require("../models/EmailLibraryFolder");
const libraryCat = require('../models/models/EmailLibraryCategory')

exports.create_folder = (req,res)=>{
    var folderObj = new libFolder(req.body)
    folderObj.save((err,folder)=>{
        if(err){
            res.send({error:'library folder is not create'})
        }
        else{
            libraryCat.findByIdAndUpdate(req.params.catId,{$push:{ folder:folder._id }})
            .exec((err,folderUpdate)=>{
                if(err){
                    res.send({error:'folder id is not push in category'})
                }
                else{
                    res.send({msg:'library folder create successfully',data:folder})
                }
            })
        }
    })
}

exports.update_folder = (req,res)=>{
    libFolder.findByIdAndUpdate(req.params.folderId,req.body)
    .exec((err,updateFolder)=>{
        if(err){
            res.send({error:'library folder is not update'})
        }
        else{
            res.send({msg:'library folder is update successfully'})
        }
    })
}

exports.delete_folder = (req,res)=>{
    libFolder.findOneAndRemove({_id:req.params.folderId},(err,delFolder)=>{
        if(err){
            res.send({error:'library folder is not remove'})
        }
        else{
            libraryCat.update({"folder":req.params.folderId},{$pull:{ "folder":req.params.folderId }},(err,data)=>{
                if(err){
                    res.send({error:'library folder is not remove in compose category'})
                }
                else{
                    res.send({msg:'library folder remove successfully'})
                }
            })
        }
    })
}

