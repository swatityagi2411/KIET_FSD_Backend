require('dotenv').config()
const express=require("express")
const app=express()
const mongoose=require('mongoose')
app.use(express.json())//middleware
const PORT=process.env.PORT||3030

const studentRoutes=require('./Routes/studentRoutes')
const authRoutes=require("./Routes/authRoute")

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
console.log("database connected")
})
.catch((error)=>{
console.log("Databse can't connected",error)
})




app.use('/students',studentRoutes)
app.use('/authroute',authRoutes)


//Server Listening on Port 3000
app.listen(3000,()=>{
    console.log("server started")
})