const express = require("express");

let app = express();  // Server ban gya 

app.listen(3000); // Server run ho gya 

// Req/Res Code here

app.get("/",(req,res)=>{
    res.send("Hello World Node");
})


app.get("/about",(req,res)=>{
    res.send("This is About Page");
})


app.get("/home",(req,res)=>{
    res.send("This is Home Page");
})