import jwt from "jsonwebtoken";
import User from "../Models/User.Model.js";
export const Authentication = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }
    const decoded = jwt.verify(token, "!@#$%^&*()_+}{");
    const id = decoded.userId;
    const user = await User.findById(id).select("-password");
    if (!user) {
      res.json({
        success: false,
        message: "Token is required",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
