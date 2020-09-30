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



//Singin 

exports.singIn = async (req,res)=> {
try {
    const {email,password}=req.body
    const userFound = await pool.query("SELECT id, firstname, lastname, password, email, joined_at from users where email = $1",[email])
    if(userFound.rowCount < 1){
        return res.status(404).json({error:"Email doesn't exists, Please Sign Up"})
    }
    console.log(userFound.rows[0].password)
    const isMatch =  await bcrypt.compare(password, userFound.rows[0].password)
    if(!isMatch){
        return res.status(401).json({error:"Invaild Credentials"})
    }
    const payload = {
        user:userFound.rows[0]
    }   
    jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:36000} ,(err,token)=>{
        if(err){
            console.log(err)
            return res.status(400).json(err)
        }
        payload.user.password = undefined
        res.status(200).json({user:payload.user, token})
    })
} catch (error) {
    console.log(error)
    res.status(500).json({error})
}
    
}

exports.getSingleUser = async (req,res) => {
    try {
    const userFound = await pool.query(`SELECT * FROM users WHERE ${Object.keys(req.query)[0]} = $1`,[req.query[Object.keys(req.query)[0]]])
    if(userFound.rows.length < 1){
        return res.json({error:"No Users Found!"})
    }
    userFound.rows[0].password = undefined
    res.json(userFound.rows[0])
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Query type is not valid!"})
    }
}