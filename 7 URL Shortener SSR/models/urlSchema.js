const mongoose = require("mongoose")

// Define Schema
const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true
    },
    visitHistory: [{
        timestamp: { type: Number }
    }]
}, { timestamps: true })

// Create Model
const URL = mongoose.model("url", urlSchema)

module.exports = URL