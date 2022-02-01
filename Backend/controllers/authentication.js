const userAuth=require('../models/users');
const ErrorHandler=require('../utils/ErrorHandler');
const catchAsyncErrors=require('../middleware/asyncError');
const tokenSend = require('../utils/jwtToken');
const sendEmail=require('../utils/sendEmail');
const crypto=require('crypto');
//Steps to register the user in a much secure way 

exports.registerUser=catchAsyncErrors( async(req,res,next)=>{
    const{name, email , password}=req.body;
    const user= await userAuth.create({
        name,
        email,
        password,
        avator:{
            public_id:'',
            urL:''
        }
    })
    //pass cookie token
    tokenSend(user,200,res)
})
// checking creditionals before Login users
exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
const {email,password}=req.body;
if(!email || !password){
    return next(new ErrorHandler('Please enter email and password',400));

}
//Checking user creditionals validity
const user = await userAuth.findOne({ email }).select('+password')//obtaining pwd

if (!user) {
    return next(new ErrorHandler('Invalid Email or Password', 401));
}

const isPasswordMatch = await user.comparePassword(password);//Compare pwd 

if (!isPasswordMatch) {
    return next(new ErrorHandler('Invalid Email or Password', 401));
}

tokenSend(user,200,res)//pass cookie token

})

exports.logout=catchAsyncErrors(async(req,res,next)=>{

    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        sucess:true,
        message:'Logged Out'
    })

})

// Password token send for reset by mail
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await userAuth.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

    try {

        await sendEmail({
            email: user.email,
            subject: 'Ambay Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500))
    }

})
// Reset the password 

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await userAuth.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }

    // Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    tokenSend(user, 200, res)

})

