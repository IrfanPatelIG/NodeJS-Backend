const sessionIdToUserMap = new Map()

function setUser(id, user) {
    console.log("setUser called")
    console.log("From authService set", id, user)
    sessionIdToUserMap.set(id, user)
}

function getUser(id) {
    console.log("getUser called")
    console.log("From authService get", id)
    return sessionIdToUserMap.get(id)
}

module.exports = {
    setUser,
    getUser
}