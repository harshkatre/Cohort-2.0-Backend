const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


 async function registerController (req,res) {
    const {username,email,password,bio,profileImage} = req.body 
    const isUserAlreadyExists = await userModel.findOne({
       $or : [
        {username} ,
        {email}
       ]
    })

   if(isUserAlreadyExists){
    return res.status(409).json({
        message : "User already exits" + (isUserAlreadyExists==email)?
        "This user email already exits" : "This username already exits" 
    })
   }

   const hash = await bcrypt.hash(password,10)

   const user = await userModel.create({
     username ,
     email , 
     bio ,
     profileImage,
     password : hash 
   })

  
   const token = jwt.sign({
     id : user._id ,
     email : user.email
   },process.env.JWT_SECERT,
    {expiresIn : "1d"}      
)
  
  res.cookie("token",token)
  
  res.status(201).json({
    message : "User Register Sucessfully" ,
    user : {
        username : user.username ,
        email : user.email ,
        bio : user.bio ,
        profileImage : user.profileImage
     }
  })

}

async function loginController (req,res)  {
    const {username,email,password} = req.body 
    const user = await userModel.findOne({
        $or : [
            {username},
            {email}
        ]
    }) 
    
    if(!user){
        return res.status(404).json({
            message : "Email does't exits"
        })
    }
   
    const isValid = await bcrypt.compare(password,user.password)

    if(!(isValid)){
        return res.status(401).json({
            message : "Invalid Password"
        }) 
    }

    const token = jwt.sign({
        id : user.id ,
        email : user.email
    } , process.env.JWT_SECERT ,
    {expiresIn : "1d"}
)

res.cookie("token",token)

  res.status(200).json({
    message : "Login Successfully!" ,
    user : {
        username : user.username ,
        email : user.email ,
        bio : user.bio ,
        profileImage : user.profileImage  
    }
  })


}


module.exports = {
    registerController ,
    loginController
}