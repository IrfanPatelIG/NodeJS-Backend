const express = require("express")
const router = express.Router()

const { restrictTo } = require("../middlewares/authMiddleware")
const { handleGoToHomeView, 
        handleGoToSignUpView, 
        handleGoToSignInView, 
        handleGoToHomeViewAdmin } = require("../controllers/staticController")

router.get("/admin", restrictTo(["ADMIN"]), handleGoToHomeViewAdmin)

router.get("/", handleGoToHomeView)
router.get("/signup", handleGoToSignUpView)
router.get("/signin", handleGoToSignInView)

module.exports = router