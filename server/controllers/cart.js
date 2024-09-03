const { Cart } = require("../models/index/index");
const { default: mongoose } = require("mongoose");

exports.addmembership = async (req, res) => {
  try {
    let  params= req.body;
    console.log('params', params);
    const { _id } = req.user;
    Cart.find({ userId: mongoose.Types.ObjectId(_id)}).exec(
        async (err, data) => {
          if (err) {
            res.send({ msg: "membership  not found", success: false });
          } else {
            if(!data.length){
                let cartObj=new Cart();
                cartObj.userId= mongoose.Types.ObjectId(_id);
                cartObj.membership_list.push(mongoose.Types.ObjectId(params.membershipId));
                await cartObj.save(async (error, result)=>{
                    if(error){
                        res.send({ msg: error.message, success: false });
                    }
                    else{
                          res.send({
                            msg: "membership created successfully",
                            success: true,
                        });
                    }
                })
            }
            else{
                await Cart.updateOne(
                    { userId: mongoose.Types.ObjectId(_id)},
                    { $push: { membership_list: params.membershipId } }
                  );
                  res.send({
                    msg: "membership added successfully",
                    success: true,
                });
               
            }  
          }
        }
      );
  } catch (error) {
    res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
};

exports.removemembership = async (req, res) => {
  try {
    const membershipId= req.params.membershipId;
    const { _id } = req.user;
    Cart.updateOne(
      { userId: mongoose.Types.ObjectId(_id)},
      { $pull: { membership_list: membershipId } }
    ).exec((err, data)=>{
      if(err){
        res.send({ msg: error.message, success: false });
      }
      else{
        res.send({
          msg: "membership removed from cart successfully",
          success: true,
        });
      }
    })

  } catch (error) {
    res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
};

exports.getitems = async (req, res) => {
  try {
    const { _id } = req.user;
    Cart.find({ userId: mongoose.Types.ObjectId(_id)}).populate('membership_list').exec(
      (err, data) => {
        if (err) {
          res.send({ msg: "membership  not found", success: false });
        } else {
          res.send({ data:data[0], success: true });
        }
      }
    );
  } catch (error) {
    res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
};

exports.membershipList = async (req, res)=>{
  try{
    const perPage=req.query.perPage;
    const page=req.query.page;
    const q=req.query.q;
    const total=await Membership.find({"membership_name" : {$regex : q}}).count();
    Membership.find({"membership_name" : {$regex : q}})
    .skip((page) * perPage)
    .limit(perPage)
    .exec(
      (err, data)=>{
        if (err) {
          res.send({
            msg: err,
            success: false,
          });
        }
        else{
          res.send({data, success:true, total});
        }
      }
    )
  }
  catch(err){
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }


}

exports.membershipUpdate = async (req, res) => {
  try {
    let membershipData = req.body;
    const membershipId = req.params.membershipId;
    Membership.updateOne({ _id: membershipId }, { $set: membershipData }).exec(
      async (err, data) => {
        console.log('***', data);
        if (err) {
          res.send({
            msg: err,
            success: false,
          });
        } else {
          if (data.modifiedCount > 0) {
            return res.send({
              msg: "membership updated succesfully",
              success: true,
            });
          }
        }
      }
    );
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.remove = async (req, res) => {
  try {
    let id = req.params.Id;
    let delete_membership = await Membership.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      { $set: { isDeleted: true } }
    );
    if (delete_membership.modifiedCount > 0) {
      return res.send({ msg: "membership deleted successfully", success: true });
    } else {
      return res.send({ msg: "membership not deleted", success: false });
    }
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};
