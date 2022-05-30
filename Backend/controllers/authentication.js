const userAuth=require('../models/users');
const ErrorHandler=require('../utils/ErrorHandler');
const catchAsyncErrors=require('../middleware/asyncError');
const tokenSend = require('../utils/jwtToken');
const sendEmail=require('../utils/sendEmail');
const crypto=require('crypto');
const cloudinary=require('cloudinary');

//Steps to register the user in a much secure way uses crypto 
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
       
    const { name, email, password } = req.body;

    if (req.body.avatar ===null) {

        const user = await userAuth.create({
        name,
        email,
        password
        })
        
    }else{
        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        })
        const user = await userAuth.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })
   
    }
    
    tokenSend(user, 200, res)

})
 
// checking creditionals before Login users
exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
const {email,password}=req.body;// get user creditionals from body 
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
// log out user from web app
exports.logout=catchAsyncErrors(async(req,res,next)=>{

    res.cookie('token',null,{// set destroy token 
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

    const user = await userAuth.findOne({ email: req.body.email });// get user by mail

    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();// obtain a reset token 

    await user.save({ validateBeforeSave: false });

    // Create reset password url
    const resetUrl = `${req.protocol}/://${req.get('host')}password/reset/${resetToken}`;

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

    } catch (error) {//send error handling if tk not found
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

    const user = await userAuth.findOne({// find user 
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

// get current logged in user details
// Change user password 
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await userAuth.findById(req.user.id).select('+password');// obtain password 

    // validate user password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) {
        return next(new ErrorHandler('Entered Password is incorrect !!'));
    }

    user.password = req.body.password;
    await user.save();

    tokenSend(user, 200, res)

})

exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await userAuth.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})


//update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    // Update avatar
    if (req.body.avatar !== '') {
        const user = await userAuth.findById(req.user.id)

        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        })

        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await userAuth.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})



//Admin routes 
exports.getAllUsers= catchAsyncErrors(async (req,res,next)=>{
    const users= await userAuth.find();
    res.status(200).json({
        sucess:true,
        users
    })
})

// Search user
exports.getUserDetials= catchAsyncErrors(async (req,res,next)=>{
    const user= await userAuth.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler('User doesnt exits'),404);
    }
    res.status(200).json({
        sucess:true,
        user
    })
})
// admin user update profile 
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
    // Create model for containing data 
     const newUserData = {
         name: req.body.name,
         email: req.body.email,
         role:req.body.role
     }
 
     // Update the profile
     const user= await userAuth.findByIdAndUpdate(req.params.id, newUserData,{
         new:true,
         runValidators:true,
         useFindAndModify:false
     })
     res.status(200).json({
         success:true
     })
 })
 //Delete Users access
 exports.deleteUsers= catchAsyncErrors(async (req,res,next)=>{
    const user= await userAuth.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler('user doesnt exits'),404);
    }

     // Remove avatar from cloudinary
    const image_id = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(image_id);

    
    await user.remove();//remove user
    
    res.status(200).json({
        success:true,
        user
    })
})