const express=require('express')
const router=express.router()
const{registeredUser,loginUser}=require('../controller/authController')

router.post('/register',registeredUser)
router.post('/login',loginUser)

module.exports=router