const checkroles=(...allowedroles)=>{
    return (req,res,next)=>{
       // const role=req.headers.role
        if(!req.user)
        {
        return res.status(401).json({
            message:""
        })
        }
        if(!allowedroles.includes(req.user.role))
        {
            return res.status(403).json({
                message:"Not allowed"
            
        }
        )
        next()
        }
    }

}
module.exports = checkroles;