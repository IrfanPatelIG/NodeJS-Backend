const URL = require("../models/urlSchema")

async function handleGoToHomeView(req, res) {
    const user = req?.user

    const allUrls = await URL.find({createdBy: user?._id})

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