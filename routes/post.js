const router = require("express").Router()
const { createPost, getSinglePost } = require("../controllers/post")
const {postValidator,validate}= require("../validate/post")
const auth = require("../middlewares/auth")

//Create Post
router.post("/posts",   auth,  postValidator() ,   validate, createPost)


//Get Single Post
router.get("/posts/:postId", getSinglePost)


module.exports = router