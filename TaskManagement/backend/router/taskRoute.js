const express=require('express')
const router=express.Router()
let tasks=[]
let taskid=1
router.get("/api/task",(req,res)=>{
res.status(200).json(tasks)
})

router.post("/api/task",(req,res)=>{
const {title}=req.body
if(!title||!title.trim())
    return res.status(404).json({message:"Title is missing"})
const newtask={
    id:taskid++,//tasks.length+1
    title:title.trim()
}
tasks.push(newtask)
res.status(200).json(newtask)

})
router.delete("/api/task/:id",(req,res)=>{
    const id=Number(req.params.id)
    if(!id)
        return res.status().json({message:""})

    const index=tasks.findIndex(task=>task.id===id)
    if(!index)
        return res.status(404).json({message:"Task not found"})

    tasks.splice(index,1)
    res.status(200).json({message:"Task deleted successfully"})
})

module.exports=router