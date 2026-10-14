const jwt = require("jsonwebtoken")
const secret = "Irfan@secret"

function setUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.name
    }
    return jwt.sign(payload, secret)
}

function getUser(token) {
    if (!token) return null
    return jwt.verify(token, secret)
}

module.exports = {
    setUser,
    getUser
}