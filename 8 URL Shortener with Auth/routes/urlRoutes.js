const express = require("express")
const router = express.Router()

const {handleCreateNewUrlShortId, handleGetUrlShortId, handleGetShortIdAnalytics} = require("../controllers/urlController")

router.post("/", handleCreateNewUrlShortId)
router.get("/:shortId", handleGetUrlShortId)
router.get("/analytics/:shortId", handleGetShortIdAnalytics)

module.exports = router