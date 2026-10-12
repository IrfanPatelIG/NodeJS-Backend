const URL = require("../models/urlSchema")

async function handleGetHomeView(req, res) {
    res.render("home")
}

module.exports = {
    handleGetHomeView
}