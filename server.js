'use strict';

const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();
const PORT=process.env.PORT || 3005;

const errorHandler = require('./auth/error-handlers/500');
const notFound = require('./auth/error-handlers/404');
const userRouter=require('./auth/route');

const app= express();
app.use(cors());



// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));


mongoose.connect(`${process.env.DATABASE_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// mongoose.connect('mongodb://localhost:27017')

app.use(userRouter);
app.use(notFound);
app.use(errorHandler);

function start(){
    app.listen(PORT,()=>{
        console.log(`Server started on ${PORT}`);
    })
}

module.exports={app, start};