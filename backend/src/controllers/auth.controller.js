import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const {username, email, password} = req.body
    try{
        if (!username || !email || !password){
            return res.status(400).json({message: "Please fill all fields correctly."})
        }

        if (password.length < 6){
            return res.status(400).json({message: "Password is too weak."})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({message: "Invalid email address"});
        }

        const user = await User.findOne({email});
        if(user) return res.status(400).json({message:"Email already exists"})
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        if(newUser){
            /*generateToken(newUser._id, res)
            await newUser.save()*/

            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);
            res.status(201).json({
                _id:newUser._id,
                fullname: newUser.fullname,
                email:newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({message: "Invalid user data"});
        }
    } catch (error) {
        console.log("Error in signup: ", error);
        res.status(500).json({message: "Internal server error"});
    }
};