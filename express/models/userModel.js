const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:Number,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true  
    },
    role:{
        type:String,
        enum:['student','admin','teacher'],
        default:'student'
    }
})

const User=mongoose.model("User",userSchema)
module.exports=User