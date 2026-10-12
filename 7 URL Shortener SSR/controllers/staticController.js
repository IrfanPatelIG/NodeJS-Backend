const URL = require("../models/urlSchema")

async function handleGetHomeView(req, res) {
    const allUrls = await URL.find({})
    res.render("home", {urls: allUrls})
}

module.exports = {
    handleGetHomeView
}