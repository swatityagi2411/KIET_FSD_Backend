const generateToken=require("../util/jwt")
const User=require('../models/userModel')
const bcrypt=require('bcrypt')

//user Registration
const registeredUser=async(req,res)=>{
    try{
        const{username,email,password,role}=req.body
        if(!username||!email||!password)
        {
            return res.status(400).json({message:"All fields required"})
        }

        //Checking for existing user
        const existingUser=await User.findone({email})
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
            role
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
        const user = await User.findOne({ email });
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

const token=generateToken(user)
//sending cookie as response
res.cookie("token",token,{
    httpOnly:true,
    secure:process.env.NODE_ENV==="production",
    sameSite:"strict",
    maxAge:60*60*100

})

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
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