// Server Creation Code

const express = require("express")
const notesModel = require("./models/notes.model")



const app = express();

app.use(express.json())


//Post / Notes / {title , description}
app.post("/notes",async (req,res)=>{
    const {title , description} = req.body

    const note = await notesModel.create({
        title , 
        description
    })

    res.status(201).json({
        message : "Note Created Successfull" ,
        note , 
    }) 

})

 // GET / notes / Read All Notes
    app.get("/notes", async(req,res)=>{
        const note = await notesModel.find()
        res.status(200).json({
            message : "All Notes" ,
            note 
        })
    }) 

 

module.exports = app ;