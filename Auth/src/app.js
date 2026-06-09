const express = require('express')
const app = express()
app.use(express.json())
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const appRoutes = require('./routes/app.routes')
app.use("/api/auth",appRoutes);



module.exports = app ;