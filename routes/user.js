const router = require("express").Router();
const {getAllUsers,singUp,singIn,getSingleUser} = require("../controllers/user")
const {userSignUpValidator,userSigninValidator,validate}= require("../validate/user")
const { postsByUser } = require("../controllers/post")
///SignUp
router.post('/signup' ,userSignUpValidator(),validate, singUp)


//SignIn
router.post('/signin' ,userSigninValidator(),validate, singIn)
router.get("/users", getAllUsers)
router.get("/users/user",getSingleUser)

//User Posts 
router.get("/users/:userId/posts", postsByUser)


module.exports = router