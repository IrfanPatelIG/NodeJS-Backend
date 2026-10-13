const URL = require("../models/urlSchema")

async function handleGoToHomeView(req, res) {
    const allUrls = await URL.find({})
    res.render("home", {
        urls: allUrls
    })
}

module.exports = {
    handleGoToHomeView
}