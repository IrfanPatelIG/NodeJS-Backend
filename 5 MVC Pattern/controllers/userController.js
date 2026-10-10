const Users = require("../models/users")

// Return all the users from MongoDB
async function handleGetAllUsers(req, res) {
    try {
        const users = await Users.find({}) // MongoDB
        
        if (users) {
            return res.json(users)
        }
        return res.status(404).json({"Status": "Not found users in DB"})
    } catch(err) {
        return res.status(401).json({"Status": "Cann't able to Get users", "error": err})
    }
}

// Create a new user in DB
async function handleCreateNewUser(req, res) {
    let data_body = req.body

    if (!data_body.first_name ||
        !data_body.last_name ||
        !data_body.email ||
        !data_body.gender ||
        !data_body.job_title) {
            return res.status(400).json({error : "Please provide all information"})
        }

    try {
        const existingUser = await Users.findOne({email: data_body.email}) // MongoDB

        if (existingUser) {
            return res.status(400).json({error : "User is already present, please try with different email."})
        }

        const result = await Users.create({
            firstName: data_body.first_name,
            lastName: data_body.last_name,
            email: data_body.email,
            gender: data_body.gender,
            jobTitle: data_body.job_title
        }) // MongoDB

        res.json({
            msg: "Successfuly added new user", 
            user: result
        })
    } catch(err) {
        return res.status(401).json({id, "Status": "Cann't able to Add new user", "error": err})
    }
}

// Return user with id
async function handleGetUserById(req, res) {
    let id = req.params.id
        
    try {
        let user = await Users.findById(id) // MongoDB
        
        if (user) {
            res.json(user)
        } else {
            res.json({"Status" : "User doesn't exist", id})
        }
    } catch(err) {
        return res.json({id, "Status": "Cann't able to get user", "error": err})
    }
}

// Edit user with id
async function handleUpdateUserById(req, res) {
    let id = req.params.id
    let data_body = req.body

    if (!data_body.first_name &&
        !data_body.last_name &&
        !data_body.email &&
        !data_body.gender &&
        !data_body.job_title) {
            return res.status(400).json({error : "Please provide the detials to update"})
        }
    
    try {
        let user = await Users.findById(id) // MongoDB

        if (user) {
            const updatedUser = await Users.findByIdAndUpdate(id, {
                firstName: data_body.first_name,
                lastName: data_body.last_name,
                email: data_body.email,
                gender: data_body.gender,
                jobTitle: data_body.job_title
            }) // MongoDB

            if (updatedUser) 
                return res.json({"Status" : "Successfully updated user", id})
            else 
                return res.json({"Status" : "Failed to update user", id})

        } else {
            return res.status(404).json({"Status" : "User not found, cannot update the user", id})
        }
    } catch(err) {
        return res.status(401).json({"Status" : "Cann't able to Update user", id})
    }
}

// Delete user with id
async function handleDeleteUserById(req, res) {
    let id = req.params.id

    try {
        const deletedUser = await Users.findByIdAndDelete(id) // MongoDB

        if (deletedUser) {
            return res.json({"Status" : `Successfully deleted user`, id})
        }
    } catch(err) {
        return res.status(500).json({id, "Status": "User not found to Delete", "error": err})
    }
}

module.exports = {
    handleGetAllUsers,
    handleCreateNewUser,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById
}