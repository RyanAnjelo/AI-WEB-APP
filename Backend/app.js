const express = require('express');//intitation of express app

const app = express();//asigning instance to app 

const errorMiddleWare=require('./middleware/error')


app.use(express.json());//stating which format is used 

//Importing  routes for config 

const products=require('./routes/products');
const userAuth = require('./routes/userAuth');
app.use('/api/v1',products);
app.use('/api/v1',userAuth);
//Middleware to handle errors
app.use(errorMiddleWare);

module.exports=app;