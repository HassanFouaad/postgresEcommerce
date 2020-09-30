const router = require("express").Router()
const { createPost } = require("../controllers/post")
const {postValidator,validate}= require("../validate/post")
const auth = require("../middlewares/auth")


router.post("/posts",   auth,  postValidator() ,   validate, createPost)

module.exports = router