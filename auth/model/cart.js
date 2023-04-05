'use strict';

const mongoose= require('mongoose');

const User= new mongoose.Schema({
    username: {  
        required: true,
        unique: true,
        type: String
      },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }

})

const userModel=mongoose.model('user',User)

module.exports=userModel;