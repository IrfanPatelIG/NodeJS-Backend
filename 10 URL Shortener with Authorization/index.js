const express = require("express")
const cookieParser = require("cookie-parser")
const path = require("path")

const { connectToMongoDB } = require("./connect")
const URL = require("./models/urlSchema")

const authRoutes = require("./routes/authRoutes")
const staticRoutes = require("./routes/staticRoutes")
const urlRoutes = require("./routes/urlRoutes")
const { checkForAuthentication, restrictTo } = require("./middlewares/authMiddleware")
 
const app = express()
const PORT = 8001

// DB Connection
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
    .then(() => console.log("MongoDB connected!"))

// Middlewares
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(checkForAuthentication)


// Routes
// Auth
app.use("/user", authRoutes)

// Static
app.use("/", staticRoutes)

// URL
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoutes)
app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId
    if (!shortId) return res.status(401).json({msg: "Short-ID is required"})

    const result = await URL.findOneAndUpdate({shortId}, {
        $push: { 
            visitHistory: { timestamp: Date.now() }  
        }
    })

    if (!result) return res.status(401).json({msg: "Provide a valid Short-ID in URL"})

    res.redirect(result.redirectURL)
})


// Server
app.listen(PORT, () => {
    console.log(`Server is live: http://localhost:${PORT}`)
})