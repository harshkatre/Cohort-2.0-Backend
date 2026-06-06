const express = require('express')
const appRoutes  =  express.Router()
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

appRoutes.post("/register", async (req,res)=>{
    let {name,email,password} = req.body 
   
    const anyexist = await userModel.findOne({email});
   
    if(anyexist){
        res.status(409).json({
        Error  : "This Email Already exist" 
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({
        name , email , password:hash 
    })

    const token =  jwt.sign({
        id : user._id ,
       email : user.email
    },
    process.env.JWT_SECERT
) 

res.cookie("jwt_token",token)

res.status(201).json({
    message : "User Created Successfully" ,
    user ,
    token
})
})

appRoutes.get("/protected",(req,res)=>{
    console.log(req.cookies);
    res.status(200).json({
        message : "This is Protected Route"
    })
})


appRoutes.post("/login",async (req,res)=>{
    const {email,password} = req.body 

    const user = await userModel.findOne({email})
    if(!user){
      return res.status(409).json({
            message : "Email is not Register"
        })
    }
    if(!(user.password=== crypto.createHash("md5").update(password).digest("hex"))){
       return res.status(401).json({
            message : "Password is Invalid"
        })
    }
    const token = jwt.sign({
        id : user._id 
    },
   process.env.JWT_SECERT
)

  res.cookie("jwt_token",token)

    res.status(200).json({
        message : "login Successfully" ,
        user ,
    })
})



module.exports =  appRoutes 



