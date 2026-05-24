const express = require("express")

const app = express()
app.use(express.json())

let notes = [];

app.get("/",(req,res)=>{
    res.send(notes)
})


let i = 0;
app.post("/notes",(req,res)=>{
    notes.push(req.body)
    res.send(`note created ${++i}`)
})

app.delete("/delete",(req,res)=>{
    notes.pop()
    --i; 
    res.send(`ALL node deleted ${JSON.stringify(notes)}`)
})


app.listen(3000,()=>{
    console.log("Server is running in 3000");
})