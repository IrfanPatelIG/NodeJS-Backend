const express = require("express")
const path = require("path")
const {connectMongoDb} = require("./connect")
const URL = require("./models/urlSchema")
const urlRoute = require("./routes/urlRoutes")
const staticRoute = require("./routes/staticRoutes")

const app = express()
const PORT = 8000

// Middlewares
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Connect to DB
connectMongoDb("mongodb://127.0.0.1:27017/short-url")
    .then(() => {
        console.log("MongoDD Connected")
    })
    .catch(err => {
        console.log("Error Conencting MongoDB\nError:", err)
    })

// Health check
app.get("/", async (req, res) => {
    res.json({msg: "Server is live"})
})

// Routes
app.use("/url", urlRoute)
app.use("/view", staticRoute)

app.get("/url/:shortId", async (req, res) => {
    const urlShortId = req.params.shortId
    if (!urlShortId) 
        return res.status(400).json({error: "URL is required!"})

    const shortUrl = await URL.findOneAndUpdate({
            shortId: urlShortId
        }, 
        {
            $push : {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        })

    if (!shortUrl) 
        return res.status(404).json({error: "ShortID id is invalid!"})
    
    res.redirect(shortUrl.redirectURL)
})


// Server
app.listen(PORT, () => {
    console.log(`Server is live on: http://localhost:${PORT}`)
})