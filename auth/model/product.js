'use strict';

const mongoose= require('mongoose');

const Product= new mongoose.Schema({
    title:{ required: true,type: String},
    des: {  required: true,type: String},
    img: {  required: true,type: String},
    categories: { type: Array},
    size: { type: Array},
    color: { type: Array},
    price:{type:Number,required:true},
    inStock:{type:Boolean,default:true},
    images: { type: Array},
})

const productModel=mongoose.model('product',Product)

module.exports=productModel;