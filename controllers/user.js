const {pool}= require("../dbconfig")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
///FETCH ALL USERS
exports.getAllUsers = async (req,res)=>{

try {
    pool.query("SELECT * FROM users" , (error,users)=>{
        if(error){
            console.log(error)
            res.status(404).json("Error happened While Getting All Users");
        }
        if(users.rows.length <1){
            res.status(404).json({error:"No Users found!"})
        }
    })
} catch (error) {
    console.log(error)
    res.status(500).json('SERVER ERROR')
}
    
}


///Signup
exports.singUp = async (req,res)=>{
    try {
        const {firstname,lastname,email,password}= req.body
        const findUser = await pool.query('SELECT id from users WHERE email = $1',[req.body.email])
        if(findUser.rowCount >=1){
            return res.status(400).json({error:"Email is already taken"})
        }
        const salt = await bcrypt.genSalt(10);
        const passWord = await bcrypt.hash(req.body.password,salt)
        pool.query("INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING id, firstname, lastname, email",
        [firstname,lastname,email,passWord],(err,user)=>{
            const payload = {
                user:user.rows[0]
              };
              jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 360000 },
                (err, token) => {
                  if (err) throw err;
                  res.json({ user:payload.user, token });
                }
              );
        })
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
}
