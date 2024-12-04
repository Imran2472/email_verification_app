import User from "../Models/User.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SendVerificationCode, VeriFyEmail } from "../Utils/Email.js";
export const Register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.json({ message: "Please fill all fields" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ message: "Email already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 8);
    const verificationcode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    SendVerificationCode(email, verificationcode);
    const newUser = new User({
      fullname,
      email,
      password: hashPassword,
      verificationcode,
    });
    await newUser.save();
    res.json({
      success: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    console.log("Error While Registration", error.message);
    res.json({ message: "Server error" });
  }
};
export const VerificationEmail = async (req, res) => {
  try {
    const { verificationcode } = req.body;
    const user = await User.findOne({ verificationcode });
    if (!user) {
      return res.json({ message: "Verification code is invalid" });
    }
    user.verified = true;
    user.verificationcode = undefined;
    await user.save();
    VeriFyEmail(user.email, user.fullname);
    res.json({
      success: true,
      message: "Email verified successfully",
      verify: user.verified,
    });
  } catch (error) {
    console.log("Error While Verifying Email", error.message);
    res.json({ message: "Server error" });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "Please fill all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found" });
    }
    if (user.verified === true) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({ message: "Invalid credentials" });
      }
      // Generate JWT token here
      const token = jwt.sign({ userId: user._id }, "!@#$%^&*()_+}{", {
        expiresIn: "48h",
      });

      res.json({
        token,
        success: true,
        message: "User logged in successfully",
        user,
      });
    } else {
      return res.json({ message: "Email not verified" });
    }
  } catch (error) {
    console.log("Error While Login", error.message);
    res.json({ message: "Server error" });
  }
};

export const Profile = async (req, res) => {
  try {
    const user = req.user;
    res.json({
      success: true,
      message: "User profile",
      user,
    });
  } catch (error) {
    console.log("Error While Getting User Profile", error.message);
    res.json({ message: "Server error" });
  }
};
