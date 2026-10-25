const { validateToken } = require("../services/authentication")

function checkForAuthTokenCookie(cookieName) {
    return (req, res, next) => {
        const cookieToken = req?.cookies[cookieName]
        if (!cookieToken) 
            return next()

        try {
            const userPayload = validateToken(cookieToken)
            req.user = userPayload
        } catch (err) {}

        return next()
    }
}

function restrictToSignedInUsersOnly(req, res, next) {
    const cookieToken = req?.cookies["token"]
    if (!cookieToken)
        return res.render("homePage", {
            error: "Unauthorized User! please SignIn first."
        })

    try {
        const userPayload = validateToken(cookieToken)
        req.user = userPayload
    } catch (err) {}

    return next()
}

module.exports = {
    checkForAuthTokenCookie,
    restrictToSignedInUsersOnly
}