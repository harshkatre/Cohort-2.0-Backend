const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption : {
        type : String ,
        default : ""
    } ,
    imgUrl : {
        type : String ,
        required : [true , "imgUrl is required"]
    },
    user : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "users" ,
        required : [true , "user ID is required"]
    }
})

const postModel = mongoose.model("post",postSchema)

module.exports = postModel