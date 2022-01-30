const mongoose= require('mongoose');
const validator= require('validator');
const bcrpyt=require('bcryptjs');// used for encrpytions
const jwt=require('jsonwebtoken');
const { json } = require('body-parser');

const userSchema= new mongoose.Schema({
name:{
    type:String,
    required:[true,'Please enter your name'],
    maxlength:[30,'Your name cant exceed 40 characters']
},
email:{
    type:String,
    required:[true,'Please enter your Mail'],
    unique:true,
    validate:[validator.isEmail , 'Please enter a valid Email ']
},
password:{
    type:String,
    required:[true,'Please enter a password'],
    minlength:[6,'Please enter a password with more than 6 character']
},
avator:{
    public_id:{
        type:String,
        //required:true
    },
    url:{
        type:String,
//required:true
    }
},
role:{
    type:String,
    default:'user'
},
createdAt:{
type:Date,
default:Date.now
},
resetPasswordToken:String,
resetPasswordExpire:Date
})
// Encrypt pass
userSchema.pre('save', async function(next){//before savung pwd encrypt 
   if(!this.isModified('password')){
       next()
   }
   this.password= await bcrpyt.hash(this.password,12);
})

//JWT token realise 

userSchema.methods.getJwtToken=function(){
 return jwt.sign ({id:this._id},process.env.JWT_SECRET,{
     expiresIn:process.env.JWT_EXPRESS_TIME // passing expiration for token valid 
 });
}
// Check pwd credibility
userSchema.methods.comparePassword=async function (enteredPassword)
{
    return await bcrpyt.compare(enteredPassword,this.password);
}

module.exports=mongoose.model('User',userSchema);