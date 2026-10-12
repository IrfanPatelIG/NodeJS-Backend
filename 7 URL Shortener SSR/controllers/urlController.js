const URL = require("../models/urlSchema")
const shortId = require("shortid")

async function handleCreateNewShortURL(req, res) {
    const body = req.body
    if (!body.url) 
        return res.status(400).json({error: "URL is required!"})

    const shortID = shortId()
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        viewHistory: []
    })
    
    const allUrls = await URL.find({})

    res.render('home', {
        urls: allUrls, 
        id: shortID
    })
}

async function handleGetAnalyticsOfUrl(req, res) {
    const id = req.params.shortId
    const resultUrl = await URL.findOne({shortId: id})

    if (!resultUrl) {
        return res.status(400).json({
            msg: "URL is not found for the given shortId, please provide a valid ShortId",
            shortId: id
        })
    }

    res.json({
        "total-clicks": resultUrl.visitHistory.length,
        "analytics": resultUrl.visitHistory
    })
}

module.exports = {
    handleCreateNewShortURL,
    handleGetAnalyticsOfUrl
}