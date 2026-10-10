const express = require("express")
const URL = require("./models/urlSchema")

const app = express()
const PORT = 6000



// Server
app.listen(PORT, () => {
    console.log(`Server is live on: http://localhost:${PORT}`)
})