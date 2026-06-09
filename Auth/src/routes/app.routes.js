const express = require('express')
const appRoutes = express.Router()
const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

appRoutes.post("/register",async (req,res)=>{
    const {name,email,password} = req.body
   
    const anyEmailExist = await userModel.findOne({email})

    if(anyEmailExist){
        return res.status(409).json({
            message : "User already Exist" 
    })
    }

    const user = await userModel.create({
        name ,
        password : crypto.createHash("md5").update(password).digest('hex') ,
        email 
    })

    const token = jwt.sign({
        id : user._id ,
        email : user.email
    },
    process.env.JWT_SECERT ,
    {expiresIn : "1h"}
)


    res.cookie("token",token)

    res.status(201).json({
        message : "User Register Successfully" ,
        user 
    })
})

appRoutes.get("/get-me",async (req,res)=>{
   const token = req.cookies.token 
   const decode = jwt.verify(token,process.env.JWT_SECERT)

   const user = await userModel.findById(decode.id)

   res.json(user) ;
  
})

appRoutes.post("/login",async (req,res)=>{
    const {email,password} = req.body 

   const user = await userModel.findOne({email})

   if(!user){
    return res.status(404).json({
        message : "User Not Found!" 
    })
   }

   const hash = crypto.createHash("md5").update(password).digest('hex')
   const isValidPassword = hash===user.password 
   if(!isValidPassword){
    return res.status(401).json({
        message : "Invalid Password" 
    }) 
   }

   const token = jwt.sign({
    id : user._id ,
    email : user.email
   }, process.env.JWT_SECERT , {expiresIn : "1h"})
 
   res.cookie("token",token)

   res.json({
    message : "User Login Successfully" ,
    user : {
        name : user.name ,
        email : user.email
    }
   })

   
})

module.exports = appRoutes 