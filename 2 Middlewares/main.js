const express = require("express")
const fs = require("fs")
const app = express()
const port = 3000

// Middleware
app.use(express.urlencoded({ extended:false })) // For putting frontend form data into body object

app.use((req, res, next) => {
    console.log("Hi, Middleware 1 is executing")
    req.userName = "Irfanpatel"
    next() // This transfers control to the next Middleware, without this the request will get stucked here
})

app.use((req, res, next) => {
    let users = ["Irfan", "Ayan", "Irfanpatel", "Abrar", "Moin"]
    console.log("Hi, Middleware 2 is executing")
    fs.appendFile("./log.txt", `\n${Date.now()} : ${req.ip} : ${req.path} : (${req.method})`, (err) => {
        if (users.find(un => un === req.userName)) {
            next()
        } else {
            console.log("User not found, Response has sent by middleware itself.")
            res.send("User not found!")
        }
    })
})

app.get("/home", (req, res) => {
    res.send(`Hi, ${req.userName} from GET request`)
})

app.listen(port, (err) => {
    console.log(`Server is lsitening on: http://localhost:${port}`)
})
