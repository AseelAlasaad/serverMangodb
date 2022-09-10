'use strict';

const bcrypt=require('bcrypt');
const base64= require('base-64');

const {userModel}=require('../model/schema.js');


async function basicAuth(req,res,next){
   
    let basicHeaderParts = req.headers.authorization.split(' ');  
    let encodedString = basicHeaderParts.pop();  
    let decodedString = base64.decode(encodedString);
    let [username, password] = decodedString.split(':'); 
    console.log([username, password] )

    try {
        
        const user= await userModel.findOne({ where: { username: username } });
        const valid= await bcrypt.compare(password, user.password);
        console.log(user)
        
        if(valid){
            res.status(200).json(user);
            next();
        }
        else{
            throw new Error('Invalid User');
        }
    } catch (error) {
        res.status(403).send('Invalid Login')
    }
}

module.exports= basicAuth;