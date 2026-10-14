const { getUser } = require("../services/auth")

async function restrictedToLoggedinUsersOnly(req, res, next) {
    console.log("restrictedToLoggedinUsersOnly called")
    console.log(req.cookies)
    const userUid = req.cookies?.uid

    if (!userUid) {
        console.log("Uid is not present in cookies from restrictedToLoggedinUsersOnly")
        return res.redirect("/signin")
    }

    const user = getUser(userUid)

    if (!user) {
        console.log("User is not present in sessionId map from restrictedToLoggedinUsersOnly")
        return res.redirect("/signin")
    }

    req.user = user
    next()
}

async function checkAuth(req, res, next) {
    console.log("checkAuth called")
    const userUid = req.cookies?.uid

    const user = getUser(userUid)
    console.log("From authMiddleware", user)
    req.user = user
    next()
}

module.exports = {
    restrictedToLoggedinUsersOnly,
    checkAuth
}