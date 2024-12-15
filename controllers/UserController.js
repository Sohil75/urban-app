const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const jwtExpireTime= 24*60*60;

exports.registerUser= async(req,res)=>{

    const{name,email,password}=req.body;
    try{
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email is already registerd"});
        }
        const hashedPassword =await bcrypt.hash(password,10);
        const newUser= new User({name,
            email:email.toLowerCase(),
            password:hashedPassword,
        });
        
        await newUser.save();
        res.status(201).json({message:"User registerd Successfully"});
    }
    catch(error){
        console.log("error during registration",error);
        
        res.status(500).json({message:"Registration faild",error});
    }
    
};


exports.loginUser=async(req,res)=>{
    const {email,password}=req.body;

    try{
        console.log("try login attempt with email",email);
        
        const user =await User.findOne({email});
        if(!user){
            console.log("user not Found");
            
            return res.status(400).json({message:"Invalid Credentials"});
        }
        console.log("user found",user);
        
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            console.log("password mismatch");
            
            return res.status(400).json({message:"Invalid Credintials"});
        }
        console.log("password match");
        
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:jwtExpireTime,
        });
        console.log("token genrated");
        
        res.status(200).json({
            message:"login successfull",
            token:`Bearer ${token}`,
            user: { id: user._id, name: user.name, email: user.email },
          });
        } catch (error) {
            console.log("error during login",error);
            
          res.status(500).json({ message: "Login failed.", error });
        }
};



