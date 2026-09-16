//import "dotenv/config"
const dotenv = require("dotenv").config()

const express = require("express")
const mongoose = require('mongoose');
const userRoute = require("./Routes/userRoutes.js")
const productRoute = require("./Routes/productRoutes.js")
const compass_string = process.env.mongoCompass_String 
const atlas_string = process.env.mongoAtlas_String
const port = process.env.PORT

mongoose.connect(atlas_string)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("Connection Error: ", err));


const app = express()



app.use(express.json())

app.get("/", (req, res) => {
    res.send("server is active")
})
app.use("/users", userRoute)
app.use("/products" , productRoute)
app.listen(port, () => {
    console.log(`server is up and running on port : ${port}`)
})