'use strict';

const bcrypt=require('bcrypt');
const base64= require('base-64');

const userModel=require('../model/schema.js');


async function basicAuth(req,res,next){
   
    let basicHeaderParts = req.headers.authorization.split(' ')[1];  
    let decodedString = base64.decode(basicHeaderParts);
    let [username, password] = decodedString.split(':'); 
     


    try {
        
        let user= await userModel.findOne({username:username});
        const valid= await bcrypt.compare(password, user.password);
     
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