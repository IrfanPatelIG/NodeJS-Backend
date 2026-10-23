const express = require("express")
const path = require("path")
const multer = require("multer")

const app = express()
const PORT = 4000

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({extended: true}))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

app.get("/", (req, res) => {
    console.log("Req:", req.query?.uploaded)
    res.render("homepage", { 
        uploaded: req.query?.uploaded
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