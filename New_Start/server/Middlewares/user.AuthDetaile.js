// Decoding jwt token and return it

import jwt from "jsonwebtoken";

export const userAuthDetail = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return res.status(200).json({
      name: decoded.name,
      email: decoded.email
    });

  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
