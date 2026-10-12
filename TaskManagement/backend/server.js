const expres=require('express')
const app=express()
//import taskroute
const taskroute=require('./router/taskRoute')
app.use(json())

//call taskRoute
app.use('/',taskroute)

app.listen(5050,()=>{
    console.log("server listening")
})