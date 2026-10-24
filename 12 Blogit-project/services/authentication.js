const jwt = require("jsonwebtoken")

const secret = "irfan@jwt"

async function createTokenForUser(user) {
    const payload = {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        salt: user.salt
    }
    const token = await jwt.sign(payload, secret)
    return token
}

async function validateToken(token) {
    const user = await jwt.verify(token, secret)
    return user
}

module.exports = {
    createTokenForUser,
    validateToken,
}