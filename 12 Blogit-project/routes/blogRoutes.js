const express = require("express")
const multer = require("multer")
const { Blog } = require("../models/blog")
const { getReadableFullDate } = require("../services/utilities")
const User = require("../models/user")
const { restrictToSignedInUsersOnly } = require("../middlewares/authentication")
const { Comment } = require("../models/comment")

const router = express.Router()

// Multer upload file config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./public/uploads`)
    },
    filename: function (req, file, cb) {
        const uploadFileName = `${Date.now()}-${file.originalname}`
        cb(null, uploadFileName)
    }
})
const upload = multer({storage: storage})


router.get("/add-new", restrictToSignedInUsersOnly, (req, res) => {
    res.render("blogAddPage", {
        user: req?.user,
        title: req?.query?.title
    })
})

router.get("/:blogId", async (req, res) => {
    const blogId = req.params.blogId

    const blog = await Blog.findOne({_id: blogId}).populate("author")
    const comments = await Comment.find({blogId: blogId}).populate("createdBy")
    console.log("Blog", blog)
    console.log("Comments", comments)

    return res.render("blogPage", {
        user: req.user,
        blog,
        comments,
        getReadableFullDate
    })
})

// Post
router.post("/add-new", restrictToSignedInUsersOnly, upload.single("coverImg"), async (req, res) => {
    const { title, descriptionBody, coverImg } = req.body

    try {
        const result = await Blog.create({
            title,
            description: descriptionBody,
            coverImgURL: req?.file.filename,
            author: req?.user._id
        })
        
        return res.redirect(`/blog/add-new?title=${encodeURIComponent(result.title)}`)
    } catch (err) {
        console.log(err)
        return res.render("homePage", {error: err.message})
    }
})

// For adding Comments
router.post("/comment/:blogId", async (req, res) => {
    const blogId = req.params.blogId
    const comment = await Comment.create({
        content: req.body.content,
        blogId: blogId,
        createdBy: req.user._id,
    })
    console.log("Single-Comment:", comment)
    res.redirect(`/blog/${blogId}`)
})

module.exports = router