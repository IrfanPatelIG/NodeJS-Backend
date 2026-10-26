const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    coverImgURL: {
        type: String,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
}, {timestamps: true})

const Blog = model("blog", blogSchema)

module.exports = {
    Blog
}