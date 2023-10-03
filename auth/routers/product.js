const productModel = require('../model/product');
const bearer_auth = require('../middleware/bearer.js');
const express = require('express');
const productRouter = express.Router();

productRouter.get('/product',productCart);
productRouter.get('/product/:id',getUserproduct);
productRouter.post('/product',addproduct);
productRouter.put('/product/:id',updateProduct);
productRouter.delete('/product/:id',deleteProduct);

async function productCart(req,res)
{
 
   try {
      const carts = await productModel.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err);
    }


}

async function getUserproduct(req,res)
{
   const id=req.params.id;
  //  console.log(id);
   try {
      const cart = await productModel.findById(id);
      // console.log(cart);
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
}

async function addproduct(req,res)
{ 


//    const {title,des,img,categories,size,color,price}= req.body;
//    await productModel.create({
//     title:title,
//     des:des,
//     img:img,
//     categories:categories,
//     size:size,
//     color:color,
//     price:price
//    });
//    productModel.find({userId:userId},(err,result)=>{
//       if(err)
//       {
//         console.log(err);
//       }
//       else{
        
//         res.send(result)
//       }
//     })
const newCart = new productModel(req.body);

try {
  const savedCart = await newCart.save();
  res.status(200).json(savedCart);
} catch (err) {
  res.status(500).json(err);
}
}

async function updateProduct(req,res){
 
   let updaterecord= await productModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    console.log(updaterecord)
    res.status(200).json(updaterecord);
}

async function deleteProduct(req,res){
   let cartId=req.params.id;
 
   let deleterecord= await productModel.findByIdAndDelete(
      cartId
    );

    res.status(200).json("the record deleted");
}
module.exports=productRouter;