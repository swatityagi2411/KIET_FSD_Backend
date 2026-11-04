const rateLimit = (limit , duration)=>{
    
        return (req, res, next) =>{

            const userIP = req.ip 
            const currentTime = Date.now()

            const requestMap = new Map() 

            const userData = requestMap.get(userIP) 

            if(!userData){
                requestMap.set(
                    userIP ,
                    {
                        count : 1 ,
                        userTime : currentTime
                    }
                    
                )
                return next 
            }

            if(currentTime - userData.userTime >= duration){
                requestMap.set(
                    userIP ,
                    {
                        count : 1 ,
                        userTime : currentTime
                    }
                )
                return next
            }
             
            if(userData.count > limit){
                return res.status(429).json({
                    success : false ,
                    message : "Max limit reached"
                })
            }

            userData.count ++ ;

            return next 
        }

}


