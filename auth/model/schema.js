'use strict';

const mongoose= require('mongoose');
const jwt=require('jsonwebtoken')
const SECRET= process.env.SECRET
const User= new mongoose.Schema({
 
    username: {
      required: true,
      unique: true,
      type: String
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { toJSON: { virtuals: true } }
);

User.virtual('token').get(function() {
  return jwt.sign({ username: this.username }, SECRET);
});
User.virtual('token').set(function(tokenObj) {
  return jwt.sign(tokenObj, SECRET);
});


const userModel=mongoose.model('user',User)

module.exports=userModel;