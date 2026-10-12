const {generateTokenAccess,generateTokenRefresh}=require("../util/jwt")
const User=require('../models/userModel')
const jwt = require("jsonwebtoken");
const bcrypt=require('bcrypt')

//user Registration
const registeredUser=async(req,res)=>{
    try{
        const{username,email,password,role}=req.body
        if(!username||!email||!password)
        {
            return res.status(400).json({message:"All fields required"})
        }
        if(password.length<8)
        {return res.status(400).json({message:"Password must contain 8 characters"})}

        //Normalizing email
        const normalizedEmail=email.trim().toLowerCase()

        //Checking for existing user
        const existingUser=await User.findone({email: normalizedEmail})
        if(existingUser){
            return res.status(409).json({message:"User already Exists"})
        }
        //generating hashed password
        const hashedPassword=await bcrypt.hash(password,10)
        //creating new user
        const user= await User.create({
            username,
            email,
            password:hashedPassword,
            role:"student"
        })
     
//returning registered user
        return res.status(201).json({
        message:"User registered successfuly",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role
        }
        })
    } catch(error){
        console.error(error)
        return res.status(500).json({message:"registration failed"})
    }

}

//Login flow
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
// checking if field is empty
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }
//loooking for user existence
        const user = await User.findOne({ email: email.trim().toLowerCase() });
//if user not found
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
//comparing hashed password with provided one
        const isPasswordCorrect =
            await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

      
//calling token generator function

const tokenAccess=generateTokenAccess(user)
const tokenRefresh=generateTokenRefresh(user)

   // Save only the refresh-token hash in MongoDB
hashedRefresh=bcrypt.hash(tokenRefresh,12)
await user.save()

// Access token cookie: sent to protected API routes
res.cookie("accessToken",tokenAccess,{httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 15 * 60 * 1000
});

// Refresh token cookie: sent to auth routes
res.cookie("refreshtoken",tokenRefresh,{
    httpOnly:true,
    secure:process.env.NODE_ENV==="production",
    sameSite:"strict",
    path:"/authroute",
    maxAge:7 * 24 * 60 * 60 * 1000

})

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }

            //save hashed password at database
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Login failed"
        });
    }
};

const logout = async(req , res)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(400).json({
            success : "false",
            message : "Token not found"
        })
    }

    res.clearCookies("token");

    return res.status(200).json({
        success : true ,
        message : "Logout successfully"
    })
}
module.exports={registeredUser,loginUser}