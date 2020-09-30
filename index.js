// Importing
require("dotenv").config()
const express = require("express")
const cors = require("cors");
const morgan = require("morgan")


// DefineApp
const app = express()


//App Middle Wares
app.use(cors())
app.use(morgan("dev"))


//API Routes

//Server Listening
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server Listening on PORT ${PORT}`)
})