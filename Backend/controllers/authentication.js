const userAuth=require('../models/users');
const ErrorHandler=require('../utils/ErrorHandler');
const catchAsyncError=require('../middleware/asyncError');
const tokenSend = require('../utils/jwtToken');

//Steps to register the user in a much secure way 

exports.registerUser=catchAsyncError( async(req,res,next)=>{
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
exports.loginUser=catchAsyncError(async(req,res,next)=>{
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

exports.logout=catchAsyncError(async(req,res,next)=>{

    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        sucess:true,
        message:'Logged Out'
    })

})
