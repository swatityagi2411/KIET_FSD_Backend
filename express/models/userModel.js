const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        trim: true

    },
    password:{
        type:String,
        required:true  
    },
    role:{
        type:String,
        enum:['student','admin','teacher'],
        default:'student'
    },
    refreshTokenHash: {
            type: String,
            default: null
    }
})

const User=mongoose.model("User",userSchema)
module.exports=User