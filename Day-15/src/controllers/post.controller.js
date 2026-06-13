const postModel = require('../models/post.model')
const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')



const imagekit = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
})


// Creating Post
async function createpostController(req,res){

    const token = req.cookies.token
    
    if(!token){
        return res.status(401).json({
            message : "token not provided , Unauthorised access"
        })
    }
    
    let decode = undefined;
    try{
        decode = jwt.verify(token,process.env.JWT_SECERT)
    } catch(err){
         return res.status(401).json({
            message : "user not authorised"
        })
    }

    // Sending File to Imagekit
   const file = await imagekit.files.upload({
    file : await toFile(Buffer.from(req.file.buffer),'file'),
    fileName : "Test",
    folder : "insta-clone-posts"
   })
  
//    Creating Post
    const post = await postModel.create({
        caption : req.body.caption ,
        imgUrl : file.url ,
        user : decode.id
    })

    res.status(201).json({
        message : "Post Created Successfully" ,
        post
    })

}

// Get Auth User Post
async function getpostController(req,res){
    const token = req.cookies.token 
    if(!token){
        return res.status(401).json({
            message : "token not provided , Unauthorised access"
        })
    }
    
    let decode = undefined;
    try{
        decode = jwt.verify(token,process.env.JWT_SECERT)
    }catch(err){
         return res.status(401).json({
            message : "user not authorised"
        })
    }

    const userPosts = await postModel.find({user:decode.id})


  const arr = userPosts.map((e)=>{
       return e.caption
  })

    return res.status(200).json({
        message: "mil gaya user" ,
        user : arr
    })
    
}

// Get Post Details by Auth user
async function getPostDetailsController(req,res){
const token = req.cookies.token 
    if(!token){
        return res.status(401).json({
            message : "token not provided , Unauthorised access"
        })
    }
    
    let decode = null;
    try{
        decode = jwt.verify(token,process.env.JWT_SECERT)
    }catch(err){
         return res.status(401).json({
            message : "user not authorised"
        })
    }

    const userId = decode.id 
    const postId = req.params.postId
   
    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message : "Post not found"
        })
    }

    const isValid = post.user.toString() === userId

    if (!isValid){
        return res.status(403).json({
            message : "Forbidden Content."
        })
    }

    res.status(200).json({
      message : "Post Fetched !!",
      post
    })
 
}


module.exports = {
    createpostController ,
    getpostController ,
    getPostDetailsController
}


  