'use strict';

const mongoose= require('mongoose');

const Order= new mongoose.Schema({
    userId:{type:String, unique:true, required:true},
    username: {  
        required: true,
        unique: true,
        type: String
      },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }

})

const orderModel=mongoose.model('order',Order)

module.exports=orderModel;