const mongose = require('mongoose')

function connectToDb (){
   mongose.connect(process.env.MONGO_URI)
   .then(()=>{
    console.log("Database is Connected");
   })
}

module.exports = connectToDb