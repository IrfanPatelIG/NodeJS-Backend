const express = require("express")

const app = express()

const port = 4000

app.get("/", (req, res) => {
    res.send("Server is lvie for HTTP Headers Learning")
})

app.listen(port, () => {
    console.log(`Server: http://localhost:${port}`)
})