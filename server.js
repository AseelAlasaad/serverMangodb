'use strict';

const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();
const PORT=process.env.PORT || 3005;

const errorHandler = require('./auth/error-handlers/500');
const notFound = require('./auth/error-handlers/404');
const userRouter=require('./auth/routers/route');
const router=require('./auth/routers/cart')
const orderRouter=require('./auth/routers/order')
const productRouter=require('./auth/routers/product')
const app= express();
app.use(cors());
app.get('/',(req,res)=>{
    res.status(200).send('Hello World')
})


// Process JSON input and put the data on req.body
app.use(express.json());



mongoose.connect(`${process.env.DATABASE_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("db is connected");
})
// mongoose.connect('mongodb://localhost:27017')

app.use(userRouter);
app.use(
    router);
app.use(orderRouter)
app.use(productRouter)
app.use(notFound);
app.use(errorHandler);

function start(){
    app.listen(PORT,()=>{
        console.log(`Server started on ${PORT}`);
    })
}

module.exports={app, start};