// Verifying user and returning true or false

import jwt from "jsonwebtoken";

export const userAuthVerifier = (req, res) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      authenticated: false,
      message: "Authentication token missing",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data for next middleware / route
    req.user = decoded;

    return res.status(200).json({
      authenticated: true,
      message: "User authenticated",
    });
  } catch (error) {
    return res.status(401).json({
      authenticated: false,
      message: "Invalid or expired token",
    });
  }
};