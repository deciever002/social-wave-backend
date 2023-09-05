import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signup = async (req,res) => {
    const {email,password,confirmPassword,firstName,lastName} = req.body;

    try {
        const existingUser = await User.findOne({email});

        if(existingUser) return res.status(400).json({message: "User already exist."});

        if(password!==confirmPassword) return res.status(400).json({message: "Passwords doesn't match"});

        const hashedPassword = await bcrypt.hash(password,12);

        const result = await User.create({email,password: hashedPassword,name: `${firstName} ${lastName}`});

        const credential = jwt.sign({email: result.email,sub: result._id,name: result.name},process.env.JWT_SECRET,{ expiresIn: '1h'})

        res.status(200).json({ credential });

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something Went wrong"});
    }
}
export const signin = async (req,res) => {
    const {email,password} = req.body;

    try {
        const existingUser = await User.findOne({email});

        if(!existingUser) return res.status(404).json({message: "User doesn't exist."});

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials. "});

        const credential = jwt.sign({email: existingUser.email,sub: existingUser._id,name: existingUser.name},process.env.JWT_SECRET,{ expiresIn: '1h'});

        res.status(200).json({ credential });

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something Went wrong"});
    }
}