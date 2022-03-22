const app = require('./app')
const connectDatabase = require('./config/db')

const dotenv = require('dotenv');
const cloudinary = require('cloudinary')

// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1)
})

// Setting up config file
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

// dotenv.config({ path: 'backend/config/config.env' })


// Connecting to database
connectDatabase();

 ///Setting up cloudinary configuration
 cloudinary.config({ 
    cloud_name: 'ambay0001', 
    api_key: '228648166915762', 
    api_secret: 'cJ03qB71W2iHplSusbqWfB3jod4' 
  });

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

// Handle Unhandled Promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1)
    })
})