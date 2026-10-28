const express=require('express')
const router=express.Router()
const Task=require("../model/taskSchema")
const User=require("../model/userSchema")



router.get("/api/task", async (req, res) => {
  
const page=parseInt(req.query.page,10)||1
const limit=parseint(req.query.limit,10)||10

const sanitizePage=page>1?page:1
const sanitizeLimit=limit<1?10:limit

skip= (sanitizePage-1)*sanitizeLimit

const {task,totalTask}=await Promise.all([
  Task.find().populate("User","name email").sort({createdAt:-1}).skip(skip).limit(sanitizeLimit),
  Task.countDocument()
])

totalPages=Math.ceil(totalTask/sanitizeLimit)

res.status(200).json({
  success:true,
  metadata:{
  totalTask,
  totalPages,
  currentPage:sanitizePage,
  hasPrevious:sanitizePage<totalPages,
  hasNext:
  },
  data:task
})

//1.Receive limit from front end or client
const limit=parseInt(req.query.limit,10)||10
const sanitizedLimit=limit<1?10:limit

//2. Receive cursor from client
const {nextCursor}=req.query

//3.Create empty query
const query={}

//check if cursor value updated than change database filter
if(nextCursor)

  query._id={$lt:new mongoose.Type.ObjectId(nextCursor)}

//Access data upto the limit+1
const task=Task.find(query).populate("User","name email").sort({_id:-1}).limit(limit+1)

//check wheather further data exists or not
const hasNext=task.length>limit
//if next data exists need to remove from task
if(hasNext)
  task.pop()

//Set newCursor with last item's id
const lastItem=task[task.length-1]

const newCursor=hasNext&&lastItem?lastItem._id:null

//Send response
res.status().json({
  success:true,
  metadata:{
    limit:sanitizedLimit,
    nextCursor=newCursor,
    hasNext
  }
  data:task
})

router.post("/api/task", async (req, res) => {
  try {
    const { title, user } = req.body;

    if (!title || !title.trim() || !user) {
      return res.status(400).json({
        message: "Title and user are required"
      });
    }

    if (!mongoose.isValidObjectId(user)) {
      return res.status(400).json({
        message: "Invalid user ID"
      });
    }

    const existingUser = await User.findById(user);

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const task = await Task.create({
      title: title.trim(),
      user: existingUser._id
    });

    const savedTask = await task.populate("user", "name email");

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.delete("/api/task/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid task ID"
      });
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
      task
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

