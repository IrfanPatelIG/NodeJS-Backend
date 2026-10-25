const express = require("express")
const { Blog } = require("../models/blog")

const router = express.Router()

router.get("/add-new", (req, res) => {
    console.log("Req-Title:", req?.title)
    res.render("blogAddPage", {
        user: req?.user,
        title: req?.query?.title
    })
})

router.post("/add-new", async (req, res) => {
    const { title, descriptionBody, coverImg } = req.body

    try {
        const result = await Blog.create({
            title,
            description: descriptionBody,
            coverImgURL: coverImg,
            author: req?.user._id
        })
        
        return res.redirect(`/blog/add-new?title=${encodeURIComponent(result.title)}`)
    } catch (err) {
        console.log(err)
        return res.render("homePage", {error: err.message})
    }
})

module.exports = router