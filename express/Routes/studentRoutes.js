const express=require('express')
const router=express.Router()
const checkroles=require('../middleware/roleMiddleware')
const Student=require('../models/studentModel')

router.use((req,res,next)=>{
console.log("You are at Student Route")
})
//Student Data
let students=[
    {
        id:1,
        name:"Smith",
        age:21,
        course:"B.tech"
    },
    {
        id:2,
        name:"John",
        age:20,
        course:"BCA"
    }
]
//Get all Students
router.get("/",checkroles('teacher','student','admin'),
async(req,res)=>{
    students=Student.find()
res.json(students)

})

//Get students by id
router.get("/:id",checkroles('teacher','student','admin'),(req,res)=>{
    const id = parseInt(req.params.id)

   const stud= students.find(student=>student.id===id)
   if(!stud)
   {
    res.status(404).json({
        message:"Student not found"
    })
    
   }
   res.json(stud)
})

//Reading data on the basis of filtrer

router.get('/search',checkroles('teacher','student','admin'),(req,res)=>{
    const course=req.query.course
    const age=req.query.age

    const stud=students.filter(s=>s.course.toLowerCase()===course.toLowerCase() && s.age===age)
    res.json(stud)
})

//Create Student
router.post("/",checkroles('teacher','admin'),(req,res)=>{

    const newStudent={
        id:students.length+1,
        name:req.body.name,
        age:req.body.age,
        course:req.body.course
    }
students.push(newStudent)

res.status(201).json({
    message:"Student Created Successfuly",
    student:newStudent
})
})
//Update complete record using put

router.put("/:id",checkroles('teacher','admin'),(req,res)=>{
    const id=req.params.id
    //const{name,age,course}=req.body
    const stud=students.find(s=>s.id===id)
    if(!stud)
   {
    res.status(404).json({
        message:"Student not found"
    })
    
   }
   stud.name=req.body.name
   stud.age=req.body.age
   stud.course=req.body.course

   res.json(stud)
})

//Delete record of student
router.delete("/:id",checkroles('admin'),(req,res)=>{
    const id=parseInt(req.params.id)
    const index=students.findIndex(student=>student.id===id)
    if(index==-1)
    {
        res.status(404).json({
            message:"No record found"
        })
    }
    students.splice(index,1)
    res.status(200).json({
        message:"Deleted Successfuly",
        student:students
    })

})
module.exports=router //export default router

