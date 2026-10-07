const mongoose=require('mongoose')
const studentSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true

    },
    course:{
        type:String,
        required:true  
    }
})

const Student=mongoose.model("Student",studentSchema)
module.exports=Student