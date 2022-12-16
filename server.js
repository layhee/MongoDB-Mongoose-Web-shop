// Dependencies
const express = require("express")
const app = express()
require("dotenv").config()


const PORT = process.env.PORT
const DATABASE_URI = process.env.DATABASE_URI

// Listener


// Middle-ware
app.use(express.urlencoded({ extended: false }));

// Dependenacies
const mongoose = require("mongoose")


// Database Hook Up
mongoose.connect(process.env.DATABASE_URI)

// DB success/fail and callback
const db = mongoose.connection
db.on("error", (err) => console.log(err.message + " is mongo not running?"))
db.on("connected", () => console.log(`Mongo connected at ${db.host} : ${db.port}`))

app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`))