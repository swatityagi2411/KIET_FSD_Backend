const errorhandler=(err,req,res,next)=>{
    console.log(err)
    const statusCode=err.statusCode() || 500
    res.status(statusCode).json({
        success:false,
        message:statuscode===500?"Internal Server Error":err.message

    })

}