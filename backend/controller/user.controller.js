import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.models.js";


export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(401).json({
                message: "Something is missing",
                success: false 
            })
        }
        const user =await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password:hashedPassword
        })
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Internal server",
            success: false
        })
    }
}

export const login = async (req,res)=>{
    try{
      const {email,password}=req.body
      if(!email || !password){
        return res.status(400).json({
            message: "Something is missing",
            success: false
        });
      }
      let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
        user = {
            _id: user._id,
            username: user.username,
            email: user.email
        }
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.username}`,
            user,
            success: true
        })
    }
    catch (error) {
        return res.status(400).json({
            message: "Internal server",
            success: false
        })
    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}