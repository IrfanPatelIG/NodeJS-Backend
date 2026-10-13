const express = require("express")
const {handleUserSignUp, handleUserSignIn} = require("../controllers/authController")

const router = express.Router()

router.post("/", handleUserSignUp)

module.exports = router