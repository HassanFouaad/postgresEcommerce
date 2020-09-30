const { pool } = require("../dbconfig");
const post = require("../validate/post");

//Create Post

exports.createPost = async (req,res)=>{
    try {
    const {title,text}=req.body
    const postTitle = title || `${ req.user.firstname } ${ req.user.lastname}`
    const post = await pool.query("INSERT into posts (userId,title,text) VALUES($1, $2, $3) RETURNING title, text, userId, id", 
     [req.user.id,postTitle,text])
    res.status(200).json({post:post.rows[0]})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error:error.message})
    }
}

//get Single Post
exports.getSinglePost = async (req,res)=> {
    try {
      const postFound = await pool.query("SELECT * FROM posts WHERE id = $1",[req.params.postId])  
    if(postFound.rowCount < 1){
        return res.json(404).json({error:"No Posts Found"})
    }
    res.status(200).json(postFound.rows[0])
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


//Posts By User
exports.postsByUser = async (req,res) => {
    try {
        const posts = await pool.query(`SELECT * FROM posts where userId = $1`,[req.params.userId])
        if(posts.rowCount < 1) {
        return res.status(404).json({error:"No Posts for this user"})
        }
        res.status(200).json(posts.rows)
    } catch (error) {
        console.log(error.message);
        res.status(400).json({error:error.message})
    }
}