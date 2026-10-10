const express = require("express")
const router = express.Router()
const { handleGetAllUsers, 
        handleCreateNewUser, 
        handleGetUserById, 
        handleUpdateUserById, 
        handleDeleteUserById } = require("../controllers/userController")


// Route that returns HTML-Doc data
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "main.html"))
})


// Routes that returns JSON format data
router.route("/api")
    .get(handleGetAllUsers)
    .post(handleCreateNewUser)

router.route("/api/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)


module.exports = router