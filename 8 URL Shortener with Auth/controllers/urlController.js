const shortId = require("shortid")
const URL = require("../models/urlSchema")

async function handleCreateNewUrlShortId(req, res) {
    const url = req.body?.url
    if (!url)
        return res.status(401).json({msg: "Url is required"}) 

    const shortID = shortId()
    
    await URL.create({
        shortId: shortID,
        redirectURL: url,
        visitHistory: []
    })

    const allUrls = await URL.find({})

    res.render("home", {
        id: shortID,
        urls: allUrls
    })
}

async function handleGetUrlShortId(req, res) {
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
}

async function handleGetShortIdAnalytics(req, res) {
    const id = req.params.shortId

    const result = await URL.findOne({shortId: id})

    if (!result) 
        return res.status(401).json({msg: "Short-Id is invalid, please try another short-id"})

    res.json({
        clicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

module.exports = {
    handleCreateNewUrlShortId,
    handleGetUrlShortId,
    handleGetShortIdAnalytics
}