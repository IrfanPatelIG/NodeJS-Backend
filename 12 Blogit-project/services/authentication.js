const jwt = require("jsonwebtoken")

const secret = "irfan@jwt"

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        salt: user.salt
    }
    const token = jwt.sign(payload, secret)
    return token
}

function validateToken(token) {
    const user = jwt.verify(token, secret)
    return user
}

module.exports = {
    createTokenForUser,
    validateToken,
}