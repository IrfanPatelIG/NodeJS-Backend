const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const {connectToMongoDb} = require("./connect")
const URL = require("./models/urlSchema")
const { restrictedToLoggedinUsersOnly, checkAuth } = require("./middlewares/authMiddleware")

const authRoutes = require("./routes/authRoutes")
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
app.use(cookieParser())


// Routes
// Auth route
app.use("/user", authRoutes)

app.use("/url", restrictedToLoggedinUsersOnly, urlRoutes)
app.use("/", checkAuth, staticRoutes)

app.get("/:shortId", async (req, res) => {
    console.log("handleGetUrlShortId called")
    const shortID = req.params.shortId
    if (!shortID)
        return res.status(401).json({msg: "Short-Id is required"})

    const result = await URL.findOneAndUpdate({shortId: shortID}, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    })

    if (!result) 
        return res.status(401).json({msg: "Short-Id is invalid, please try another short-id"})

    res.redirect(result.redirectURL)
})

// Server
app.listen(port, () => {
    console.log(`Server is live on: http://localhost:${port}`)
})