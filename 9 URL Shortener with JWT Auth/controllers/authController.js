const {setUser} = require("../services/auth")
const User = require("../models/userSchema")
const URL = require("../models/urlSchema")

async function handleUserSignUp(req, res) {
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

    console.log("SignUp successful")
    res.redirect("/")
}

async function handleUserSignIn(req, res) {
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
    
    // Adding logged in user's jwt-signed token into cookie
    const token = setUser(user)
    res.cookie("token", token)
    
    console.log("SignIn successful")
    // res.json({token})
    res.redirect("/")
}

module.exports = {
    handleUserSignUp,
    handleUserSignIn
}