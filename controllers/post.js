const { pool } = require("../dbconfig");

//Create Post

exports.createPost = async (req,res)=>{
    try {
    const {title,text}=req.body
    if(!title){
        title = `${ req.user.firstname } ${ req.user.lastname}`
    }
   const post = await pool.query("INSERT into posts (userId,title,text) VALUES($1, $2, $3) RETURNING title, text, userId, id",  [req.user.id,title,text])
    res.status(200).json({post:post.rows[0]})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error:error.message})
    }
}
