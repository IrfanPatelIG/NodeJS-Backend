const URL = require("../models/urlSchema")

async function handleGoToHomeView(req, res) {
    const user = req?.user
    
    let msg = null
    if (!user) {
        msg = "Needs to Sign In"
    }
    
    const allUrls = await URL.find({createdBy: user?._id})

    return res.render("home", {
        urls: allUrls,
        user: user,
        msg
    })
}

function handleGoToSignUpView(req, res) {
    res.render("signup")
}

function handleGoToSignInView(req, res) {
    res.render("signin")
}

async function handleGoToHomeViewAdmin(req, res) {
    const user = req.user

    const allUrls = await URL.find({})

    return res.render("home", {
        urls: allUrls,
        user: user 
    })
}

module.exports = {
    handleGoToHomeView,
    handleGoToSignUpView,
    handleGoToSignInView,
    handleGoToHomeViewAdmin
}