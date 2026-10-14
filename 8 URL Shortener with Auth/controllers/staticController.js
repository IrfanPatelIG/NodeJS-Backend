const URL = require("../models/urlSchema")

async function handleGoToHomeView(req, res) {
    console.log("handleGoToHomeView called")
    const allUrls = await URL.find({})
    
    console.log("From staticController", req.user)
    const user = req?.user
    res.render("home", {
        user,
        urls: allUrls
    })
}

async function handleGoToSignUpView(req, res) {
    console.log("handleGoToSignUpView called")
    res.render("signUp")
}

async function handleGoToSignInView(req, res) {
    console.log("handleGoToSignInView called")
    res.render("signIn")
}

module.exports = {
    handleGoToHomeView,
    handleGoToSignUpView,
    handleGoToSignInView
}