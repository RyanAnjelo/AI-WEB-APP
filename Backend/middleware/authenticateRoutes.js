//Import modules
const jwt = require("jsonwebtoken");
const catchAsyncErrors=require("./asyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const User=require('../models/users');

//  Authenticating the user session validity in backend than front end ...
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    const { token } = req.cookies

    if (!token) {// checks if token of user session is valid else return
        return next(new ErrorHandler('Login to access the resource required.', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next()
})

// Handling users roles for resource auth
exports.authorizationOfRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`${req.user.role} is restricted acccess to the resource`, 403))
        }
        next()
    }
}

