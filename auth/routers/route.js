'use strict';

const bcrypt = require('bcrypt');
const express = require('express');
const userRouter = express.Router();
const userModel = require('../model/schema.js');
const basicAuth = require('../middleware/basic-auth.js');
const bearer_auth = require('../middleware/bearer.js');


userRouter.post("/signup", async (req, res) => {
    try {
          req.body.password = await bcrypt.hash(req.body.password, 10);

        const newuser = new userModel(req.body)
        console.log(newuser)
        let user= await userModel.findOne({username:req.body.username});
        if (user) return res.status(400).send('User already registered.');
        else{

            newuser.save()
            res.status(201).json(newuser)
        }
    } catch (error) {
        res.status(403).send("Error Creating User");
    }




})

userRouter.post('/signin', basicAuth, async (req, res) => {
    const userInfo = req.user;
    res.status(200).json(userInfo);
})
userRouter.get('/users', bearer_auth, async(req,res,next)=>{
    const allusers= await userModel.find();
    
    const list= allusers.map(user=> user.username);
    res.status(200).json(allusers)
})


module.exports = userRouter;