const express = require('express');//intitation of express app

const app = express();//asigning instance to app 

const errorMiddleWare=require('./middleware/error')

const cookieParser=require('cookie-parser')

app.use(express.json());//stating which format is used 

app.use(cookieParser())
//Importing  routes for config 

const products=require('./routes/products');
const userAuth = require('./routes/userAuth');
const order = require('./routes/orders');
app.use('/api/v1',products);
app.use('/api/v1',userAuth);
app.use('/api/v1',order);
//Middleware to handle errors
app.use(errorMiddleWare);

module.exports=app;