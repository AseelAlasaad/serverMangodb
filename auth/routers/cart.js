const cartModel = require('../model/cart');
const bearer_auth = require('../middleware/bearer.js');
const express = require('express');
const router = express.Router();

router.get('/cart',getCart);
router.get('/cart/:id',getUserCart);
router.post('/cart',addCart);
router.put('/cart/:id',updateCart);
router.delete('/cart/:id',deleteCart);

async function getCart(req,res)
{
 
   try {
      const carts = await cartModel.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err);
    }


}

async function getUserCart(req,res)
{
   const id=req.params.id;
   try {
      const cart = await cartModel.findOne({id:id});
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
}


async function addCart(req,res)
{ 


   
  const userId= req.body.userId;
  const productId= req.body.productId;
  const quantity= req.body.quantity;
  
  // console.log('userId',userId);
  // console.log('productId',productId);
  // console.log('quantity',quantity);
   await cartModel.create({
    userId:userId,
    productId:productId,
    quantity:quantity
   });


   cartModel.find({userId:userId},(err,result)=>{
      if(err)
      {
        console.log(err);
      }
      else{
        // console.log(result);
        res.send(result)
      }
    })
}

async function updateCart(req,res){
  const id=req.params.id;
  const {userId,productId,quantity}= req.body;

    cartModel.findByIdAndUpdate(id,{userId,productId,quantity},(err,result)=>{
      cartModel.find({productId:productId},(err,result)=>{
        if(err)
        {
          console.log(err);
        }
        else{
          console.log(result);
          res.send(result)
        }
      })
    })


}

async function deleteCart(req,res){
   let cartId=req.params.id;
 
   let deleterecord= await cartModel.findByIdAndDelete(
      cartId
    );

    res.status(200).json("the record deleted");
}
module.exports=router;