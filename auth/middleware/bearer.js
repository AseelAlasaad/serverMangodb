'use strict';
const userModel=require('../model/schema.js');
const jwt= require('jsonwebtoken');
const SECRET=process.env.SECRET;
const bearer_auth=async(req,res,next)=>{
  
         if(!req.headers.authorization){ _authError()}
         
         const token= req.headers.authorization.split(' ').pop();
        // const validUser= await users.authorization(token);
        validateToken(token).then(()=>{
              next()
        })
        .catch(error=>{
            next(`invalid user or token ${error}`);
        })

    function _authError(){
        next('Invalid Login')
    }
}

async function validateToken(token){
    try {
        const parsedToken= jwt.verify(token, SECRET);

    let user =  userModel.findOne({where:{username: parsedToken.username}})

    if(user){
        return user;
    }
    else{
        throw new Error('invalid token or user')
    }
    } catch (error) {
        throw new Error(error.message)
    }
    
}

module.exports=bearer_auth