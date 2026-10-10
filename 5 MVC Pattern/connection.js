const mongoose = require('mongoose');

async function connectMongoDb(url) {
    return await mongoose.connect(url)
}

module.exports = { connectMongoDb }