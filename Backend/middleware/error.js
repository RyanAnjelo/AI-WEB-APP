const ErrorHandler = require('../utils/ErrorHandler');
const errorHandler=require('../utils/ErrorHandler');

module.exports=(err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    
    //Seperating error messages based on user
    //Dev mode
    if(process.env.NODE_ENV==='DEVELOPMENT'){
        res.status(err.statusCode).json({
            sucess:false,
            error:err,
            errMessage:err.message,
            stack:err.stack
        })
    }
//Production
    if(process.env.NODE_ENV==='PRODUCTION'){
        let error={...err}
        error.message=err.message;

        //Handling object id errors
        if (err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`
            error = new ErrorHandler(message, 400)
        }
        // Handling mongoose validatiom error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value=>value.message);
            error = new errorHandler(message,400)

            error = new ErrorHandler(message, 400)
        }

        res.status(err.statusCode).json({
            sucess:false,
            message:err.message || 'Internal Server Error'
        })
    }

}