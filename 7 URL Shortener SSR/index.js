const express = require("express")
const path = require("path")
const {connectMongoDb} = require("./connect")
const URL = require("./models/urlSchema")
const urlRoute = require("./routes/urlRoutes")

const app = express()
const PORT = 8000

// Middlewares
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.use(express.json())

// Connect to DB
connectMongoDb("mongodb://127.0.0.1:27017/short-url")
    .then(() => {
        console.log("MongoDD Connected")
    })
    .catch(err => {
        console.log("Error Conencting MongoDB\nError:", err)
    })

// Health check
app.get("/test", async (req, res) => {
    // res.json({msg: "Server is live"})
    const allUrls = await URL.find({})
    res.render("home", {urls: allUrls})
})

// URL Routes
app.use("/url", urlRoute)

app.get("/:shortId", async (req, res) => {
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

    // res.json({msg: `Successully fetched Short URL for ${urlShortId}`, url: shortUrl.redirectURL})
    res.redirect(shortUrl.redirectURL)
})


// Server
app.listen(PORT, () => {
    console.log(`Server is live on: http://localhost:${PORT}`)
})