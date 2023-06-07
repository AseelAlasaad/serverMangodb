'use strict';

const mongoose= require('mongoose');

const Product= new mongoose.Schema({
    title:{ required: true,unique: true,type: String},
    des: {  required: true,type: String},
    img: {  required: true,type: String},
    categories: { type: Array},
    size:{type:String},
    color:{type:String},
    price:{type:Number,required:true}

})

const productModel=mongoose.model('product',Product)

module.exports=productModel;