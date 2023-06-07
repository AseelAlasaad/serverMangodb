const orderModel = require('../model/order')
const bearer_auth = require('../middleware/bearer.js');
const express = require('express');
const orderRouter = express.Router();

orderRouter.get('/order',getOrder);
orderRouter.get('/order/:id',getUserOrder);
orderRouter.post('/order',addOrder);
orderRouter.put('/order/:id',updateOrder);
orderRouter.delete('/order/:id',deleteOrder);

async function getOrder(req,res)
{
 
   try {
      const orders = await orderModel.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }


}

async function getUserOrder(req,res)
{
   const id=req.params.id;
   try {
      const order = await orderModel.findOne({id:id});
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
}

async function addOrder(req,res)
{ 
   const userId= req.body.userId;
   const products= req.body.products;
   const amount=req.body.amount
   const address=req.body.address
   const status=req.body.status
   await orderModel.create({
      userId:userId,
      products:products,
      amount:amount,
      address:address,
      status:status
   });
   orderModel.find({userId:userId},(err,result)=>{
      if(err)
      {
        console.log(err);
      }
      else{
        
        res.send(result)
      }
    })
}

async function updateOrder(req,res){
 
   let updaterecord= await orderModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    console.log(updaterecord)
    res.status(200).json(updaterecord);
}

async function deleteOrder(req,res){
   let orderId=req.params.id;
 
   let deleterecord= await orderModel.findByIdAndDelete(
    orderId
    );

    res.status(200).json("the record deleted");
}
module.exports=orderRouter;