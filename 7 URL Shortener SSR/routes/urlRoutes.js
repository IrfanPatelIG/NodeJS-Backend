const express = require("express")
const { handleCreateNewShortURL, 
        handleGetAnalyticsOfUrl } = require("../controllers/urlController")

const router = express.Router()

router.post("/", handleCreateNewShortURL)

router.get("/analytics/:shortId", handleGetAnalyticsOfUrl)


module.exports = router