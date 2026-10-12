const express = require("express")
const { handleCreateNewShortURL, 
        handleGetShortURLByShortId, 
        handleGetAnalyticsOfUrl } = require("../controllers/urlController")

const router = express.Router()

router.post("/", handleCreateNewShortURL)

// router.get("/:shortId", handleGetShortURLByShortId)

router.get("/analytics/:shortId", handleGetAnalyticsOfUrl)


module.exports = router