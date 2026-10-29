const http = require("http")
const express = require("express")
const path = require("path")

const app = express()
const server = http.createServer(app)
const PORT = 5000

app.use(express.static(path.resolve("./public")))

app.get("/", (req, res) => {
    res.sendFile("/public/index.html")
})

server.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`)
})