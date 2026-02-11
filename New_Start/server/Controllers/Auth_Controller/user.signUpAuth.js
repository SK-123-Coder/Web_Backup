// User signup controller

import User from "../../Models/User.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

// signup auth controller
export const signUpController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({ 
      name, 
      email, 
      password: hashedPassword
    });
    
    await user.save();

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
    
    return res.sendStatus(201);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};