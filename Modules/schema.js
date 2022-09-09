'use strict';

const mongoose= require('mongoose');

const User= new mongoose.Schema({
    username:String,
    password:String
})

const userModel=mongoose.model('user',User)

module.exports=userModel;