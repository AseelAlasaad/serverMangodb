'use strict';

const mongoose= require('mongoose');

const Cart= new mongoose.Schema({
  userId:{type:String},
  productId:{type:String},
  quantity:{type:Number},

})

const cartModel=mongoose.model('Cart',Cart)

module.exports=cartModel;