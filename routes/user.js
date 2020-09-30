const router = require("express").Router();
const {getAllUsers,singUp} = require("../controllers/user")
const {userSignUpValidator,userSigninValidator,validate}= require("../validate/user")

///SignUp
router.post('/signup' ,userSignUpValidator(),validate, singUp)

//SignIn



router.get("/users", getAllUsers)




module.exports = router