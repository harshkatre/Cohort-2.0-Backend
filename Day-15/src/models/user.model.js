const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
      type : String ,
      unique : [true , "This Username Already Exists"] ,
      required : [true , "Username is Required"]
    } ,
    email : {
      type : String ,
      unique : [true , "This Email Already Exists"] ,
      required : [true , "Email is Required"]
    } ,
    password : {
        type : String  ,
        required : [true, "Password is required"]
    } ,
    bio : String ,
    profileImage : {
        type : String ,
        default : "https://ik.imagekit.io/Harsh12/default_user_image.jfif" 
    }
})

const userModel = mongoose.model("User",userSchema);

module.exports = userModel