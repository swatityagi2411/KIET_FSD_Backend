const jwt=require("jsonwebtoken")
const generateTokenAccess=(user)=>{
    jwt.sign(
        {
            role:user.role,
            id:user._id
        },
    process.env.SECRET_KEY,
    {
        expiresIn:"1h"
    }
    )
}
const generateTokenRefresh=(user)=>{
    jwt.sign(
        {
           
            id:user._id
        },
    process.env.SECRET_KEY,
    {
        expiresIn:"1h"
    }
    )
}


module.exports=generateTokenAccess