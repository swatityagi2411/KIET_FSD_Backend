const express=require('express')
const app=express()
const PORT=8000
//Application Level Middleware
//1. Middleware not mount on path
app.use((req,res,next)=>{
    console.log("Middleware 1")
    console.log("Request Type",req.method)
    next()
})

app.use((req,res,next)=>{
    console.log("Middleware 2")
    next()
})

app.get((req,res)=>{
    res.send("Thanks")
})
app.get((req,res,next)=>{
    console.log("Request Type",req.method)
    next()
})

//2. Middleware Mount on Path
app.use("/student",(req,res,next)=>
{
    console.log("Requested Url",req.originalUrl)
    next()
})

//3.Multiple Route Handler

app.use("/student",(req,res,next)=>{
    console.log("Requested Method",req.method)
        
    },
    (req,res,next)=>{
        console.log("Requested Url",req.originalUrl)
})
//Skiping middleware or redirecting to route
app.get('student/:id',(req,res,next)=>{
 if(req.params.id==='0')
    next('route')
else
    next()
},
(req,res)=>{
    res.end('Regular Route')
})

app.get('/student/:id',(req,res)=>{
    res.end('special route')
})

//Error handling Middleware
app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status().send()
})

app.listen(PORT,()=>{
    console.log("Server Started")
})