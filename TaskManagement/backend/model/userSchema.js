const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
name:{
    type:String,
    require:true,
    trim:true
},
email:{
    type:String,
    require:true,
    unique:true
}
})

module.exports=mongoose.model("User",userSchema)