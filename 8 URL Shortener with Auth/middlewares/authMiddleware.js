const { getUser } = require("../services/auth")

async function restrictedToLoggedinUsersOnly(req, res, next) {
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
    const userUid = req.cookies?.uid

    const user = getUser(userUid)
    req.user = user
    next()
}

module.exports = {
    restrictedToLoggedinUsersOnly,
    checkAuth
}