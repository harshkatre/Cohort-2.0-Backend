const express = require('express')
const jwt = require('jsonwebtoken')
const authRoutes = express.Router()

const userModel = require('../models/user.model')

authRoutes.post('/register' , async (req,res)=>{
    const {name,email,password} = req.body ;
  
     const anyexist = await userModel.findOne({email}) ;
      
     if(anyexist){
       res.status(400).json({
        Error : "This Email Already exist"
       })
      }
   const user  = await userModel.create({
    name , email , password
   })
    
   const token = jwt.sign({
    id : user._id,
    email : user.email
   },
    process.env.JWT_SECRET 
  )  

    res.cookie("jwt_token",token)  
   
   res.status(201).json({
    message : "User created successfully" ,
    user ,
    token
   })
})


module.exports = authRoutes 