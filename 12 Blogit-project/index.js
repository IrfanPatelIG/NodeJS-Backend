const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const { checkForAuthTokenCookie } = require("./middlewares/authentication")

// Router
const userRouter = require("./routes/userRoutes")
const blogRouter = require("./routes/blogRoutes")

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
app.use((req, res, next) => {
    res.locals.currentPath = req.path
    next()
})


// Routes
app.get("/", (req, res) => {
    res.render("homePage", 
        {user: req?.user}
    )
})

app.use("/user", userRouter)
app.use("/blog", blogRouter)

// Server
app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`)
})