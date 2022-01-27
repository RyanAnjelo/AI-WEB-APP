const userAuth=require('../models/users');
const ErrorHandler=require('../utils/ErrorHandler');
const catchAsyncError=require('../middleware/asyncError');

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
    res.status(201).json({
        success:true,
        user
    })
})
