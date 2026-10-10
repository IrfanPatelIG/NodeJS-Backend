const express = require("express")
const {connectMongoDb} = require("./connection")

const userRouter = require("./routes/userRouter")

const app = express()
const port = 5000


// Connection
connectMongoDb("mongodb://127.0.0.1:27017/users")
    .then(() => {
        console.log("MongoDB Connected Successfuly!")
    })

// Middlewares
app.use(express.urlencoded({ extended:false }))
app.use(express.static("public"))


// Routes
app.use("/users", userRouter)


// Server
app.listen(port, () => {
    console.log(`Server is listening on: http://localhost:${port}`)
})