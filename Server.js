//Import http built in module
const http=require('http')

const server=http.createServer((req,res)=>{
if(req.url==='/user' && req.method==="POST")
{
  let body=''
  req.on('data',(chunk)=>{
    body+=chunk
  })

  req.on('end',()=>{
   console.log("Raw Data",body)
   const user=JSON.parse(body)
   console.log("Parsed Data",user)
   res.writeHead(200,{'content-type':'application/json'})
    res.end(JSON.stringify({
    message:"User Created Successfully",
    user:user
  }))
  })

 

}
else
    res.end("Not found")

})


server.listen(3000,()=>{console.log("Server started")})