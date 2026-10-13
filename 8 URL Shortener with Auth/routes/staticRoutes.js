const express = require("express")
const router = express.Router()

const { handleGoToHomeView } = require("../controllers/staticController")

router.get("/", handleGoToHomeView)

module.exports = router