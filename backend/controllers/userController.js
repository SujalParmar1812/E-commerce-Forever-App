import userModel from "../models/userModel.js"
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//route for user registration
const registerUser = async (req,res) => {
     try {
        const {username,email,password} = req.body;

        //if email already exist or not
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"});
        }

        //validating email
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Invalid email"});
        }

        //checking password
        if(password.length<8){
            return res.json({success:false,message:"Enter strong password"});
        }

        //hashing user password
        // const salt = bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new userModel({
            username,
            email,
            password:hashedPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({success:true,message:"signup successful",token})

     } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
     }
}
//route for user login
const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;

        const user= await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User does not exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const token = createToken(user._id);
            res.json({success:true,message:"login successful",token});
        }else{
            return res.json({success:false,message:"Invalid credentials"});
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}


//route for admin login
const adminLogin = async (req,res) => {
     try {
        const {email,password} = req.body;
        if (email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid credentials"})
        }
        
     } catch (error) {
        res.json({success:false,message:error.message})
     }
}




export {
    loginUser,registerUser,
    adminLogin
} 