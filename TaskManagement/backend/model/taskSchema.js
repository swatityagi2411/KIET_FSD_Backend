const mongoose=require('mongoose')
const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    user:{
        type:mongoose.Schema.types.ObjectId,
        ref:"User",
        required:true
    }

},
{timestamps:true})
const Task=mongoose.model("Task",taskSchema)
module.exports=Task