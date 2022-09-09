'use strict';

const express=require('express');
const cors=require('cors');
const app= express();

require('dotenv').config();
const PORT=process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).send("hello world");

})


function start(){
    app.listen(PORT,()=>{
        console.log(`Server started on ${PORT}`);
    })
}

module.exports={app, start};