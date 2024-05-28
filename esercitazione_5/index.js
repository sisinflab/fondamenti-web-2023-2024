const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")
const collectionRoutes = require("./routes/collections")

const path = "DB_CONNECTION_URI"


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("static"))
app.use("/api/collections", collectionRoutes)

mongoose.connect(path).then( () => {
    console.log("database connected")
    app.listen(3000, () => {
        console.log("listening on port 3000")
    })
}).catch((err) => {
    console.log(err)
})