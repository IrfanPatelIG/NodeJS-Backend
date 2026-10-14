const {v4: uuidv4} = require("uuid")
const {setUser} = require("../services/auth")
const User = require("../models/userSchema")
const URL = require("../models/urlSchema")

async function handleUserSignUp(req, res) {
    console.log("handleUserSignUp called")
    const {name, email, password} = req.body

    const result = await User.findOne({email})

    if (result) {
        return res.render("signup", {
            msg: "Email is already registered, please try again with another one!"
        })
    }         

    await User.create({
        name: name,
        email: email,
        password: password
    })

    res.redirect("/")
}

async function handleUserSignIn(req, res) {
    console.log("handleUserSignIn called")
    const {email, password} = req.body

    const user = await User.findOne({
        email, 
        password
    })

    if (!user) {
        return res.render("signin", {
            msg: "Email or Password is wrong, please try again!"
        })
    }

    // Adding logged in user's session-id into cookie
    const sessionid = uuidv4()
    setUser(sessionid, user)
    res.cookie("uid", sessionid)

    res.redirect("/")
}

module.exports = {
    handleUserSignUp,
    handleUserSignIn
}