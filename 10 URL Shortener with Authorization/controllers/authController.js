const user = require("../models/userSchema");
const URL = require("../models/urlSchema")
const { setUser } = require("../services/auth");


async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body
    
    const result = await user.findOne({email})

    if (!result)
        return res.render("signup", {msg: "Email is already present, please try again with new email"})

    await user.create({
        name,
        email,
        password,
        role: "NORMAL"
    })

    console.log("Successfuly Signed Up")
    res.redirect("/")
}

async function handleUserSignIn(req, res) {
    const {email, password} = req.body

    const result = await user.findOne({email, password})

    if (!result) 
        return res.render("signin", {msg: "Email or password is invalid!"})

    const token = setUser(result)
    res.cookie("token", token)

    console.log("Successfuly Signed In")
    res.redirect("/")
}


module.exports = {
    handleUserSignUp,
    handleUserSignIn
}