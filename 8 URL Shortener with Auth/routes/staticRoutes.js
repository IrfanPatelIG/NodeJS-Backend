const express = require("express")
const router = express.Router()

const { handleGoToHomeView, handleGoToSignUpView, handleGoToSignInView } = require("../controllers/staticController")

router.get("/", handleGoToHomeView)
router.get("/signup", handleGoToSignUpView)
router.get("/signin", handleGoToSignInView)

module.exports = router