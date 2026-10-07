const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const checkroles = require("../middleware/roleMiddleware");
const User = require("../models/userModel");

router.get('/',(req,res)=>{
    const {token} = req.cookies
    if(!token) res.status(400).json({message:"user not logged in"});
    res.status(200).json({user: user})
})

router.post('/createUser',async(req,res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password)
        return  res.status(400).json({message: "fields are missing"})
    
    const user = await User.findOne({email:email,username:username});
    if(user) res.status(200).json({message:"user already exists"});

    const hashedPass = await bcrypt.hash(password,10);
    const newUser = await User.create({
        username:username,
        email:email,
        password: hashedPass
    })
    if(!newUser) 
        return  res.status(400).json({message:"something went wrong"});
    res.status(200).json({message: "user created successfully"});
})

router.post('/login',async(req,res)=>{
    try {
        const {email, password}=req.body
        if(!email || !password) res.status(400).json({message: "email and password are required"});

        const ExistingUser = await User.findOne({email:email})
        if(!ExistingUser) res.status(401).json({message:"user not found"});

        const comparedPassword = await bcrypt.compare(password, ExistingUser.password)
        if(!comparedPassword) res.status(400).json({message: "wrong password"})

        res.status(200).json({message:"you are logged in", user: {
            username: ExistingUser.username,
            email:ExistingUser.email
        }})
    } catch (error) {
        res.status(400).json({message:"error occured during login"});
    }
})

