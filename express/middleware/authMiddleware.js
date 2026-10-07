const jwt=require("jsonwebtoken")
const authMiddleware=(req,res,next)=>{
try{
    const {token}=req.cookies
    if(!token)
        return res.status.json({message:""})
    const check=jwt.verify(token,process.env.SECRET_KEY)
    req.user=check
}catch(error)
{
    console.log(error)
    return res.status().json({})
}

}

module.exports=authMiddleware