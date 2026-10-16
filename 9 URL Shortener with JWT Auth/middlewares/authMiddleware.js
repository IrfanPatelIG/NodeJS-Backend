const { getUser } = require("../services/auth")

async function restrictedToLoggedinUsersOnly(req, res, next) {
    // const authHeader = req.headers["authorization"]
    // const authToken = authHeader.split("Bearer ")[1]
    const authToken = req.cookies?.token

    if (!authToken) {
        console.log("Token is not present in cookies from restrictedToLoggedinUsersOnly")
        return res.redirect("/signin")
    }

    const user = getUser(authToken)

    if (!user) {
        console.log("User is not present in coockies -> \"toekn\" from restrictedToLoggedinUsersOnly")
        return res.redirect("/signin")
    }

    req.user = user
    next()
}

async function checkAuth(req, res, next) {
    // const authHeader = req.headers["authorization"]
    // const authToken = authHeader.split("Bearer ")[1]
    const authToken = req.cookies?.token

    const user = getUser(authToken)
    req.user = user
    next()
}

module.exports = {
    restrictedToLoggedinUsersOnly,
    checkAuth
}