// ALL CRUD CODE

const express = require("express")
const userModel = require("./model/user.model")
const app = express()
app.use(express.json())



// Created User
app.post("/user", async (req,res)=>{
    const {name,age,email} = req.body 
  const user =  await userModel.create({
        name ,
        age ,
        email 
    })
    res.status(201).json({
        message : "User Created Successfully" , 
        user
    })
})


// Read User 
app.get("/user", async (req,res)=>{
    const user = await userModel.find()
    res.status(200).json({
        message : "All USERS" ,
        user 
    })
})

// Update User
app.patch("/user/update",async (req,res)=>{
    const {name , nwname} = req.body  
    const user = await userModel.findOneAndUpdate({name:name},{name:nwname},{new:true})
    res.status(200).json({
        message : "Updated User" ,
        user
    })
})


// Delete User 
app.delete("/user/delete",async (req,res)=>{
     const {name} = req.body 
    const user = await userModel.findOneAndDelete({name:name})
    res.status(200).json({
        message : "User Deleted" ,
        user
    })
})





module.exports = app 