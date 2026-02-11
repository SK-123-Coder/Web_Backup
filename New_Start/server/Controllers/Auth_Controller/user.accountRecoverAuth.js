//  User account recover controller

import User from "../../Models/User.js";

// Account recover auth controller 
export const accountRecoverController = async (req, res) => {
    try{
        const { name, email } = req.body;

        if (!name || !email) {
        return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }

        await user.deleteOne();

        res.status(200).json({ message: "User deleted successfully" });

    } catch (err){
      console.error("Recover ERROR", err);
      return res.status(500).json({ error: err.message });
    }
}