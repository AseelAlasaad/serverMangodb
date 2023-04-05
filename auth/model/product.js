'use strict';

const mongoose= require('mongoose');

const Product= new mongoose.Schema({
    username: {  
        required: true,
        unique: true,
        type: String
      },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }

})

const productModel=mongoose.model('product',Product)

module.exports=productModel;