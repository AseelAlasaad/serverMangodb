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
   const products= req.body.products;
   await cartModel.create({
      userId:userId,
      products:products
   });
   cartModel.find({userId:userId},(err,result)=>{
      if(err)
      {
        console.log(err);
      }
      else{
        
        res.send(result)
      }
    })
}

async function updateCart(req,res){
 
   let updaterecord= await cartModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    console.log(updaterecord)
    res.status(200).json(updaterecord);
}

async function deleteCart(req,res){
   let cartId=req.params.id;
 
   let deleterecord= await cartModel.findByIdAndDelete(
      cartId
    );

    res.status(200).json("the record deleted");
}
module.exports=router;