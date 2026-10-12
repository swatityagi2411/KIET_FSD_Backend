const jwt=require("jsonwebtoken")
const generateTokenAccess=(user)=>{
    return jwt.sign(
        {
            role:user.role,
            id:user._id
        },
    process.env.SECRET_KEY,
    {
        expiresIn:"15m"
    }
    )
}
const generateTokenRefresh=(user)=>{
    return jwt.sign(
        {
           
            id:user._id
        },
    process.env.SECRET_KEY,
    {
        expiresIn:"7d"
    }
    )
}


module.exports=
{generateTokenAccess,generateTokenRefresh}