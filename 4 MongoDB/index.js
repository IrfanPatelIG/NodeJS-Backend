const express = require("express")
const fs = require("fs")
const cors = require('cors')
const path = require("path")
const mongoose = require('mongoose');


// const users = require("./MOCK_DATA.json")

const app = express()
const port = 3000
const fileName = "./MOCK_DATA.json"


// Connection
mongoose
    .connect("mongodb://127.0.0.1:27017/users")
    .then(() => { console.log("MongoDB Connected") })
    .catch((err) => { console.log("Error connecting MongoDB:", err) })

// Define Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: "string",
        required: true
    },
    lastName: {
        type: "string"
    },
    email: {
        type: "string",
        required: true,
        unique: true
    },
    gender: {
        type: "String",
    },
    jobTitle: {
        type: "String"
    }
}, {timestamps: true})

// Creating modle from schema
const Users = mongoose.model("users", userSchema)


// Middlewares
app.use(cors())
app.use(express.urlencoded({ extended:false }))
app.use(express.static("public"))


// Routes that returns JSON format data
app.get("/api/users", (req, res) => {
    // Return all the users from MongoDB
    console.log("Sending user's data from MongoDB...")
    // return res.json({msg: "Mongo"})
})

app.route("/api/users/:id")
    // Return user with id
    .get( (req, res) => {
        let id = Number (req.params.id)
        let user = users.find(user => user.id === id)

        if (user) {
            res.json(user)
        } else {
            res.json({"Status" : "User doesn't exist", id})
        }
    })
    // Edit user with id
    .patch((req, res) => {
        let id = Number (req.params.id)
        let data_body = req.body
        let user = users.find(u => u.id === id)
        if (user) {
            Object.assign(user, { id }, data_body) // Updating the user with new data from frontend in data_body
            fs.writeFile(fileName, JSON.stringify(users), (err, data) => {
                if (err) {
                    console.error("File write error:", err);
                    return res.status(500).json({ "Status": "Failed to write file", error: err.message });
                }
                return res.json({"Status" : "Successfully updated user", id})
            })
        } else {
            res.json({"Status" : "Failed to update user", id})
        }
    })
    // Delete user with id
    .delete((req, res) => {
        let id = Number (req.params.id)
        let index = users.findIndex(user => user.id === id)
        
        if (index === -1) { 
            return res.status(404).json({"Status" : `User doesn't exist`, id})
        }

        // Remove 1 element from index
        users.splice(index, 1)
        fs.writeFile(fileName, JSON.stringify(users), (err, data) => {
            if (err) {
                console.error("File write error:", err);
                return res.status(500).json({ "Status": "Failed to write file", error: err.message });
            }
            return res.json({"Status" : `Successfully deleted user`, id})
        })
    })

// Add a new user
app.post("/api/users", async (req, res) => {
    let data_body = req.body

    if (data_body.first_name &&
        last_name &&
        data_body.email &&
        data_body.gender &&
        data_body.job_title) {
            res.status(400).json({error : "Please provide all information"})
        }

    Users.findOne({...data_body})
        .then(() =>
            res.status(400).json({error : "User is already present, please try with different email."})
        )

    const result = await Users.create({
        firstName: data_body.first_name,
        lastName: data_body.last_name,
        email: data_body.email,
        gender: data_body.gender,
        jobTitle: data_body.job_title
    })

    console.log(result)

    res.status(201).json({
        msg: "Successfuly added new user", 
        user: result
    })
})


// Health Cehck
app.get("/", (req, res) => { res.redirect("/users") })

// Route that returns HTML-Doc data
app.get("/users", (req, res) => {
    // let html = `
    //     <ul>
    //         ${users.map((users) => `<li>${users.first_name}  -  ${users.job_title}</li>`).join("")}
    //     </ul>
    // `
    // res.send(html)

    res.sendFile(path.join(__dirname, "public", "main.html"))
})

app.listen(port, (req, res) => {
    console.log(`Server is listening on: http://localhost:${port}`)
})