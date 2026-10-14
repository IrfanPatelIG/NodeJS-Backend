const express = require("express")
const router = express.Router()

const {handleCreateNewUrlShortId, handleGetShortIdAnalytics} = require("../controllers/urlController")

router.post("/", handleCreateNewUrlShortId)
router.get("/analytics/:shortId", handleGetShortIdAnalytics)

module.exports = router