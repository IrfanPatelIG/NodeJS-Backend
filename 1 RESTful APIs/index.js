const express = require("express")
const fs = require("fs")
const cors = require('cors')

const users = require("./MOCK_DATA.json")

const app = express()
const port = 3000
const fileName = "./MOCK_DATA.json"

// Middlewares
app.use(cors())
app.use(express.urlencoded({ extended:false }))
app.use(express.static("public"))

// Routes that returns JSON format data
app.get("/api/users", (req, res) => {
    // Return all the users in JSON
    return res.json(users)
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

        if (!data_body.first_name || !data_body.last_name || !data_body.email ||
        !data_body.gender || !data_body.job_title) {
            res.status(400).json({error: "Please provide all information"})
        }

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
        
        if (index < 0) {
            // Remove 1 element from index
            users.splice(index, 1)
            fs.writeFile(fileName, JSON.stringify(users), (err, data) => {
                if (err) {
                    console.error("File write error:", err);
                    return res.status(500).json({ "Status": "Failed to write file", error: err.message });
                }
                return res.json({"Status" : `Successfully deleted user`, id})
            })
        } else {
            return res.json({"Status" : `User doesn't exist`, id})
        }
    })

// Add a new user
app.post("/api/users", (req, res) => {
    let data_body = req.body

    if (!data_body.first_name || !data_body.last_name || !data_body.email ||
        !data_body.gender || !data_body.job_title) {
            res.status(400).json({error: "Please provide all information"})
        }

    if (users.find(user => user.email === data_body.email)) {
        return res.status(400).json({error : "User is already present, please try with different email."})
    }

    users.push({id: users[users.length-1].id + 1, ...data_body})
    fs.writeFile(fileName, JSON.stringify(users), (err, data) => {
        return res.json({"Status" : "Successfully added new user", "Id" : users[users.length-1].id})
    })
})


// Route that returns HTML-Doc data
app.get("/users", (req, res) => {
    let html = `
        <ul>
            ${users.map((users) => `<li>${users.first_name}  -  ${users.job_title}</li>`).join("")}
        </ul>
    `
    res.send(html)
})

app.listen(port, (req, res) => {
    console.log(`Server is listening on: http://localhost:${port}`)
    console.log("Got to */users* for all users data")
})