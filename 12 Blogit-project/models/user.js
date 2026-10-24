const { createHmac, randomBytes } = require("crypto")
const { Schema, model } = require("mongoose");
const { createTokenForUser } = require("../services/authentication");

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    proflieImageURL: {
        type: String,
        default: "./images/defaultProfile.png"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, {timestamps: true})

// Hasing password
userSchema.pre("save", function () {
    const user = this;

    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;
});

// Virtual function
userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
    const user = await this.findOne({email})
    if (!user) 
        throw new Error("User not found, please try again with another Email!")

    const salt = user.salt

    const hashedPassword = createHmac("sha256", salt)
        .update(password+"")
        .digest("hex")

    if (hashedPassword !== user.password) 
        throw new Error("Inccorect Email or Password!")

    const token = createTokenForUser(user)
    return token
})

const User = model('users', userSchema)

module.exports = User