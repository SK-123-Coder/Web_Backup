// User login controller

import User from "../../Models/User.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

// Login auth controller
export const loginController = async (req, res) => {
    try{
        const { email, password } = req.body;

        if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        
        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
        {
            userId: user._id,
            name: user.name,
            email: user.email
        },
        process.env.JWT_SECRET
        );

        res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000, // ✅ 7 days
        });

        return res.sendStatus(200);

    } catch (err) {
      console.error("LOGIN ERROR", err);
      return res.status(500).json({ error: err.message });
    }
}