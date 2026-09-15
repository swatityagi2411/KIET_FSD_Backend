const checkroles=(...allowedroles)=>{
    return (req,res,next)=>{
        const role=req.headers.role
        if(!role)
        {
        return res.status().json({
            message:""
        })
        }
        if(allowedroles.includes(role))
        {
            next();
        }
        else
        {
            return res.status(403).json({
                message:"Not allowed"
            })
        }
    }

}
module.exports = checkRoles;