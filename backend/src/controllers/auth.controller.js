import { sendWelcomeEmail } from "../emails/emailHandler.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import {ENV} from "../lib/env.js";

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
                username: newUser.username,
                email:newUser.email,
                profilePic: newUser.profilePic,
            });

            try {
                await sendWelcomeEmail(savedUser.email, savedUser.username, ENV.CLIENT_URL);
            } catch (error) {
                console.error("Failed to send welcome email:", error);
            }
        } else {
            res.status(400).json({message: "Invalid user data"});
        }
    } catch (error) {
        console.log("Error in signup: ", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if (!user) return res.status(400).json({message: "Invalid credentials"});
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});

        generateToken(user._id, res)
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.error("Error in login controller: ", error)
        res.status(500).json({message: "Internal server error"});
    }
};

export const logout = (_, res) => {
    res.cookie("jwt", "", {maxAge: 0});
    res.status(200).json({message: "Logged out successfully."});
};