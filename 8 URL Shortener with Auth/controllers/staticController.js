const URL = require("../models/urlSchema")

async function handleGoToHomeView(req, res) {
    const allUrls = await URL.find({})
    const user = {name: "Default - Irfan"}
    res.render("home", {
        user,
        urls: allUrls
    })
}

async function handleGoToSignUpView(req, res) {
    res.render("signUp")
}

async function handleGoToSignInView(req, res) {
    res.render("signIn")
}

module.exports = {
    handleGoToHomeView,
    handleGoToSignUpView,
    handleGoToSignInView
}