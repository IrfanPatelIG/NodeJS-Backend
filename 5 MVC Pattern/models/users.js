const mongoose = require('mongoose');

// Define Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: "string",
        required: true
    },
    lastName: {
        type: "string"
    },
    email: {
        type: "string",
        required: true,
        unique: true
    },
    gender: {
        type: "String",
    },
    jobTitle: {
        type: "String"
    }
}, {timestamps: true})

// Creating modle from schema
const Users = mongoose.model("users", userSchema)

module.exports = Users