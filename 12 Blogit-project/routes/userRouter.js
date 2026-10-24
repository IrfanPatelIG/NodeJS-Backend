const User = require("../models/user")
const { createHmac } = require("crypto")
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
    const { fullName, email, password } = req.body
    await User.create({
        fullName,
        email,
        password
    })
    return res.redirect("/")
})

router.post("/signin", async (req, res) => {
    const {email, password} = req.body

    try {
        const token = await User.matchPasswordAndGenerateToken(email, password)
        console.log("User Signed-In successfully\nToken:", token)
    } catch (err) {
        console.log(err)
        return res.status(404).json({"Error" : err.message})
    }
 
    return res.redirect("/")
})


module.exports = router