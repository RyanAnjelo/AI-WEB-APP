const mongoose= require('mongoose');
const validator= require('validator');

const userSchema= new mongoose.Schema({
name:{
    type:String,
    required:[true,'Please enter your name'],
    maxlength:[30,'Your name cant exceed 40 characters']
},
email:{
    type:String,
    required:[true,'Please enter your mail'],
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
        required:true
    },
    url:{
        type:String,
        required:true
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
module.exports=mongoose.model('User',userSchema);