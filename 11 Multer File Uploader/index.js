const express = require("express")
const path = require("path")
const multer = require("multer")
const upload = multer({ dest: "uploads/" })

const app = express()
const PORT = 4000

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    console.log("Req:", req.query?.uploaded)
    res.render("homepage", { 
        uploaded: req.query?.uploaded === 1
    })
})

app.post("/upload", upload.single("profileImage"), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    let uploaded = req.file?.originalname ? 1 : 0
    res.redirect(`/?uploaded=${uploaded}`)
})

app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`)
})