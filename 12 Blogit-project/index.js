const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const multer = require("multer")

const { checkForAuthTokenCookie, restrictToSignedInUsersOnly } = require("./middlewares/authentication")

// Router
const userRouter = require("./routes/userRoutes")
const blogRouter = require("./routes/blogRoutes")
const { Blog } = require("./models/blog")

// DB Connection
mongoose.connect("mongodb://127.0.0.1:27017/blogit-app")
    .then(() => console.log("MongoDB is Connected!"))

const app = express()
const PORT = 8000

// Setting views
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
app.get("/", async (req, res) => {
    const user = req?.user

    let blogs
    if (user)
        blogs = await Blog.find({author: user._id})

    res.render("homePage", {
        user: user,
        blogs
    })
})

app.use("/user", userRouter)

app.get("/blog", (req, res) => {
    res.redirect(`/user/signin`)
})
app.use("/blog", restrictToSignedInUsersOnly, blogRouter)

// Server
app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`)
})