const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const { checkForAuthTokenCookie } = require("./middlewares/authentication")

// Router
const userRoutes = require("./routes/userRouter")

// DB Connection
mongoose.connect("mongodb://127.0.0.1:27017/blogit-app")
    .then(() => console.log("MongoDB is Connected!"))

const app = express()
const PORT = 8000

// Settign views
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))


// Middlewares
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(checkForAuthTokenCookie("token"))


// Routes
app.get("/", (req, res) => {
    res.render("homePage", 
        {user: req?.user}
    )
})

app.use("/user", userRoutes)

// Server
app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`)
})