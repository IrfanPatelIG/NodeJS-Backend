const mongoose = require("mongoose")

async function connectToMongoDb(url) {
    await mongoose.connect(url)
}

module.exports = {connectToMongoDb}