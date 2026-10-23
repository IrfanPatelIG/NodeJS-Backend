const express = require("express")
const path = require("path")

const app = express()
const PORT = 4000

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.redirect("/upload")
})

app.get("/upload", (req, res) => {
  res.json("Upload API")  
})

app.listen(PORT, (req, res) => {
    console.log(`Server: http://localhost:${PORT}`)
})