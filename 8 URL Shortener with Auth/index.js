const express = require("express")
const path = require("path")
const URL = require("./models/urlSchema")
const {connectToMongoDb} = require("./connect")

const urlRoutes = require("./routes/urlRoutes")
const staticRoutes = require("./routes/staticRoutes")

const port = 8001
const app = express()

// DB Connection
connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.error("Error connecting MongoDB - ", err))

// Middlewares
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.use("/", staticRoutes)
app.use("/url", urlRoutes)

// Server
app.listen(port, () => {
    console.log(`Server is live on: http://localhost:${port}`)
})