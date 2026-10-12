const express = require("express")
const { handleGetHomeView } = require("../controllers/staticController")

const router = express.Router()

router.get("/", handleGetHomeView)

module.exports = router