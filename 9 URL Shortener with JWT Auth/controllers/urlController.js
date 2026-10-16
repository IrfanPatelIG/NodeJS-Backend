const shortId = require("shortid")
const URL = require("../models/urlSchema")

async function handleCreateNewUrlShortId(req, res) {
    const user = req?.user
    const url = req.body?.url
    
    if (!url) {
        return res.render("home", {
            user,
            msg: "URL is required!"
        })
    }

    const shortID = shortId()
    
    await URL.create({
        shortId: shortID,
        redirectURL: url,
        visitHistory: [],
        createdBy: user._id 
    })
    
    const allUrls = await URL.find({createdBy: user._id})
    
    res.render("home", {
        user,
        id: shortID,
        urls: allUrls
    })
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
    handleGetShortIdAnalytics
}