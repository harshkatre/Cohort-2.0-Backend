// Creating Schema & Model

const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    name : String ,
    age : Number ,
    email : String
}) 


const userModel = mongoose.model("User",userSchema) 

module.exports = userModel 