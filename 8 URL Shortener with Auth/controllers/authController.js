const User = require("../models/userSchema")
const URL = require("../models/urlSchema")

async function handleUserSignUp(req, res) {
    const {name, email, password} = req.body

    const result = await User.findOne({email})

    if (result) {
        return res.render("signUp", {
            msg: "Email is already registered, please try again with another one!"
        })
    }         

    await User.create({
        name: name,
        email: email,
        password: password
    })

    const allUrls = await URL.find({})

    res.render("home", {
        user: {name, email},
        urls: allUrls
    })
}

async function handleUserSignIn(req, res) {
    const {email, password} = req.body

    const result = await User.findOne({
        email, 
        password
    })

    if (!result) {
        return res.render("signIn", {
            msg: "Email or Password is wrong, please try again!"
        })
    }         

    const allUrls = await URL.find({})

    res.render("home", {
        user: {name: result.name, email},
        urls: allUrls
    })
}

module.exports = {
    handleUserSignUp,
    handleUserSignIn
}