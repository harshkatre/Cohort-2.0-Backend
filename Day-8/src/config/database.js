const mongoose = require("mongoose")

function connectToDB(){
  mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("Database Connected Day-8")
  })
}

module.exports = connectToDB 
