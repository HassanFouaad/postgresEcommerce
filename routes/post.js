const router = require("express").Router()
const { createPost,getAllPosts, getSinglePost ,updateSinglePost ,deleteSinglePost} = require("../controllers/post")
const {postValidator,validate}= require("../validate/post")
const auth = require("../middlewares/auth")

//Create Post
router.post("/posts",   auth,  postValidator() ,   validate, createPost)

//Get All Posts from dataBase 
router.get("/posts", getAllPosts)
//Get Single Post
router.get("/posts/:postId", getSinglePost)

//Update Post
router.put("/posts/:postId",auth,  updateSinglePost)

//delete Single Post
router.delete("/posts/:postId", auth , deleteSinglePost)
module.exports = router