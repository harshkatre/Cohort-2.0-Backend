const express = require("express")

const app = express() // SERVER CREATED 

let notes = [] ;



app.use(express.json());

// Adding the Client Note 
app.post("/notes",(req,res)=>{
    notes.push(req.body)
    res.send("Note Added")
})


// Get the Client Note
app.get("/",(req,res)=>{
    res.send(notes)
})


// Delete the Saved Note 
app.delete("/notes/:index",(req,res)=>{
    notes.splice(req.params.index,1)
    res.send("Note Deleted Succesfully")
})


// Partially Update the Description
app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description =  req.body.description ;
    res.send("Description Updated")
})


    module.exports = app // Export server