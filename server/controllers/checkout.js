const stripe = require("stripe")(process.env.STRIPE_PUBLIC_KEY);
const mongoose = require("mongoose");
const { MembershipSales } = require("../models/index/index");
const createPaymentIntent=async (payment_id, total)=>{
  let paymentIntent;
  try{
    paymentIntent=await stripe.paymentIntents.create({
      payment_method:payment_id,
      amount: total,
      currency: 'usd',
      payment_method_types: ['card'],
      confirm:true
    });
  }
  catch(e){

  }
  return paymentIntent;
}

exports.checkoutMemberships = async (req, res) => {
    let {_id}=req.user;
    const {holderName, cardNumber,expiryDate,cvv, contact, memberships, total}=req.body;
    const splitted_date=expiryDate.split('/');
    expire_year=splitted_date[0];
    expire_month=splitted_date[1];
    let paymentMethod;
    try{
        paymentMethod= await stripe.paymentMethods.create({
          type:'card',
          card:{
            number:cardNumber,
            exp_month:expire_month,
            exp_year:expire_year,
            cvc:cvv
          }
        });
        createPaymentIntent(paymentMethod.id, total).then(async (result, err)=>{
          if(err){
            res.send({msg:`${err.message}`, status:'failed'})
          }
          else{
            let membershipsalesObj=new MembershipSales();
            membershipsalesObj.buyerId=mongoose.Types.ObjectId(contact);
            membershipsalesObj.sellerId=mongoose.Types.ObjectId(_id);
            for(let i=0; i<memberships.length; i++){
              membershipsalesObj.memberships.push(memberships[i]);
            };
            await membershipsalesObj.save(async (err, data)=>{
              if(err){
                res.send({msg:`${e.message}`, status:'failed'})
              }
              else{
                res.send({msg:'payment successfully done.', status:'success'})
              }
            }) 
          }
        })
    }
    catch(e){
      switch(e.type){
        case 'StripeCardError':
          console.log(`A payment error occurred: ${e.message}`);
          res.send({msg:`${e.message}`, status:'failed'})
          break;
        case 'StripeInvalidRequestError':
          console.log('An invalid request occurred.');
          res.send({msg:`${e.message}`, status:'failed'})
          break;
        default:
          res.send({msg:`Server has an issue. Try again.`, status:'failed'})
          break;
      }
    } 
};



