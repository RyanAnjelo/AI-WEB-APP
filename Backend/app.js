const express = require('express');
const app = express();

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cloudinary = require('cloudinary')


const fileUpload = require('express-fileupload')

// const dotenv = require('dotenv');
const path = require('path')


const errorMiddleWare=require('./middleware/error')

// Setting up config file 
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })
// dotenv.config({ path: 'backend/config/config.env' })
 
//Setting up cloudinary configuration
 cloudinary.config({ 
    cloud_name: 'ambay0001', 
    api_key: '228648166915762', 
    api_secret: 'cJ03qB71W2iHplSusbqWfB3jod4' 
  });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(fileUpload({useTempFiles: true}))


// Import all routes
const products=require('./routes/products');
const auth = require('./routes/userAuth');
const payment = require('./routes/payments');
const order = require('./routes/orders');




//defines the api route to follow 
app.use('/api/v1', products)
app.use('/api/v1', auth)
//app.use('/api/v1', payment)
app.use('/api/v1', order)


// Middleware to handle errors
app.use(errorMiddleWare);

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}




module.exports = app