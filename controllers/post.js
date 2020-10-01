const { pool } = require("../dbconfig");
const post = require("../validate/post");

//Create Post
exports.createPost = async (req,res)=>{
    try {
    const {title,text}=req.body
    const postTitle = title || `${ req.user.firstname } ${ req.user.lastname}`
    const post = await pool.query("INSERT into posts (userId,title,text) VALUES($1, $2, $3) RETURNING title, text, userId, id, created_at", 
     [req.user.id,postTitle,text])
    res.status(200).json({post:post.rows[0]})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error:error.message})
    }
}

//Get All Database Posts

exports.getAllPosts = async (req,res)=> {
  try {
    const posts = await pool.query("SELECT * from POSTS ORDER BY created_at DESC ")
    res.status(200).json(posts.rows)
  } catch (error) {
      res.status(404).json({error:error.message})
  }
}


//get Single Post
exports.getSinglePost = async (req,res)=> {
    try {
    const postFound = await pool.query("SELECT * FROM posts WHERE id = $1",[req.params.postId])  
    if(postFound.rowCount < 1){
        return res.status(404).json({error:"No Posts Found"})
    }
    res.status(200).json(postFound.rows[0])
    } catch (error) {
    res.status(400).json({error:error.message})
    }
}


//Update Single Post
exports.updateSinglePost = async (req,res)=> { 
    try {
    const postFound = await pool.query("SELECT * FROM posts WHERE id = $1",[req.params.postId])  
    if(postFound.rowCount < 1){
         return res.json(404).json({error:"No Posts Found"})
        }
    if(postFound.rows[0].userid !== req.user.id){
        return res.status(401).json({error:"Not Authorized, This is not your Post"})
    }
    const {text,title} = req.body
    const postTitle = title || `${ req.user.firstname } ${ req.user.lastname}`
    pool.query("UPDATE posts set text = $2, title = $3 where id = $1 RETURNING id, userid , text, title, created_at",
    [req.params.postId,text,    postTitle], (error,post)=>{
        if(error){
            return res.status(400).json({error})
        }
    res.status(200).json(post.rows[0])
    })
    } catch (error) {
    res.status(400).json({error:error.message})
    }
}


///Delete Single Post
exports.deleteSinglePost = async (req,res) => {
try {
    const postFound = await pool.query("SELECT userId from posts where id = $1",[req.params.postId])
    console.log(postFound.rows)
    if(postFound.rowCount < 1){
        return res.status(404).json({error:"No Posts Found"})
       }
   if(postFound.rows[0].userid !== req.user.id){
       return res.status(401).json({error:"Not Authorized, This is not your Post"})
   }

    pool.query('DELETE from posts where id = $1',[req.params.postId],(error)=>{
       if(error)
       {
           return res.status(400).json({error})
       }
     return  res.status(200).json({message:"Post has been deleted Successfully"})
   })
} catch (error) {
    return res.json({error:error.message})
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