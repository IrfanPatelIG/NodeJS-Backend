const User = require("../models/user")
const { validateToken } = require("../services/authentication")
const express = require("express")
const router = express.Router()

// Serve Static pages
router.get("/signup", (req, res) => {
    res.render("signupPage")
})

router.get("/signin", (req, res) => {
    res.render("signinPage")
})


// Post endpoints
router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req?.body
    await User.create({
        fullName,
        email,
        password
    })
    return res.redirect("/user/signin")
})

router.post("/signin", async (req, res) => {
    const {email, password} = req?.body

    try {
        const token = await User.matchPasswordAndGenerateToken(email, password)
        return res.cookie("token", token).redirect("/")
    } catch (err) {
        console.log(err)
        return res.render("signinPage", {
            "error" : err.message
        })
    }
})

router.get("/logout", async (req, res) => {
    res.clearCookie("token")
    console.log("Lougout successfully!")
    return res.redirect("/")
})

module.exports = router