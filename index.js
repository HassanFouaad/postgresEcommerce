// Importing
require("dotenv").config()
const express = require("express")
const cors = require("cors");
const morgan = require("morgan")
const userRouter = require("./routes/user")
const bodyParser = require('body-parser');
// DefineApp
const app = express()

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//App Middle Wares
app.use(cors())
app.use(morgan("dev"))


//API Routes
app.use("/api", userRouter)
//Server Listening
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server Listening on PORT ${PORT}`)
})