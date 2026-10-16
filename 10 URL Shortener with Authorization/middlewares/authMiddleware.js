const { getUser } = require("../services/auth")

async function checkForAuthentication(req, res, next) {
    const token = req.cookies?.token
    req.user = null

    if (!token) return next()

    const user = getUser(token)
    
    req.user = user
    return next()
}

function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user) return res.redirect("/signin")

        if (!roles.includes(req.user.role)) return res.end("UnAuthorised user")
        
        return next()
    }
}

module.exports = {
    checkForAuthentication,
    restrictTo
}