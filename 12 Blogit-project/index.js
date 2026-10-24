const express = require("express")
const path = require("path")

const app = express()
const PORT = 8000

// Settign views
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))


// Middlewares



// Routes
app.get("/", (req, res) => {
    res.json({health: "Server is live!"})
})


// Server
app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`)
})