const router = require("express").Router();
const {getAllUsers,singUp,singIn,getSingleUser} = require("../controllers/user")
const {userSignUpValidator,userSigninValidator,validate}= require("../validate/user")

///SignUp
router.post('/signup' ,userSignUpValidator(),validate, singUp)


//SignIn
router.post('/signin' ,userSigninValidator(),validate, singIn)

router.get("/users", getAllUsers)

router.get("/user",getSingleUser)




module.exports = router