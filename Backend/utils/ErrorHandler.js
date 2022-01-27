    //Inheritance will be used from error class for handling controller errors
    class ErrorHandler extends Error {
        constructor(message, statusCode) {
            super(message);
            this.statusCode = statusCode
    
            Error.captureStackTrace(this, this.constructor)
        }
    }
    
    module.exports = ErrorHandler;