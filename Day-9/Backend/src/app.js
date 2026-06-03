// Server Creation
// Server ko Database se Connect karna 

const express = require('express')
const noteModel = require('./model/note.model')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.static("./public"))
app.use(express.json())
app.use(cors())

//Post 
app.post('/notes', async (req,res)=>{
    const {title , description} = req.body
    const note = await noteModel.create({
      title,
      description
    })
    res.status(201).json({
        message : "Note Create Successfully" ,
        note 
    })
})

//Get
app.get('/notes',async (req,res)=>{
    const note = await noteModel.find()
    res.status(200).json({
        message : "All Notes ",
        note
    })
})

// Delete
app.delete('/notes/delete/:id',async (req,res)=>{
    const id = req.params.id
    const note = await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message : "Note Deleted",
        note
    })
})

// Patch
app.patch('/notes/update/:id',async (req,res)=>{
    const id = req.params.id
    const {description} = req.body
    const note = await noteModel.findByIdAndUpdate(id,{description})
    res.status(200).json({
        message : "Note Update Successfully",
        note
    })
})


app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

module.exports = app 