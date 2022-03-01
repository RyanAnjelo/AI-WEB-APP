const express = require('express');//intitation of express app

const app = express();//asigning instance to app 
const path = require('path');
const errorMiddleWare=require('./middleware/error')

const cookieParser=require('cookie-parser')

// Setting up config file 
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

app.use(express.json());//stating which format is used 

app.use(cookieParser())
//Importing  routes for config 

const products=require('./routes/products');
const userAuth = require('./routes/userAuth');
const order = require('./routes/orders');
app.use('/api/v1',products);
app.use('/api/v1',userAuth);
app.use('/api/v1',order);

app.use(errorMiddleWare);
//Setting start up for the web app

// app.use(express.static(path.join(__dirname, '../Frontend/build')))

// app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, '../Frontend/build/index.html'))
//     })
app.use(express.static(__dirname + '/public'));

app.get('/', (req,res,next) => {
    res.sendfile(__dirname + '/public/index.html');
  })


//Middleware to handle errors
app.use(errorMiddleWare);

module.exports=app;