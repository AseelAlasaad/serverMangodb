'use strict';

const mongoose= require('mongoose');

const Cart= new mongoose.Schema({
  userId:{type:String},
  productId:{type:String},
  quantity:{type:Number, default:1},

})

const cartModel=mongoose.model('cart',Cart)

module.exports=cartModel;