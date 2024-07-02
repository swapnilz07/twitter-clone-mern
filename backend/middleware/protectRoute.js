import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res.status(401).json({ message: "You need to login first." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded)
      return res.status(401).json({ message: "Unauthorized: Invalid Token." });

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protected Route middleware: ", error.message);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};
