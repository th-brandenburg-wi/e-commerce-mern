import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { json } from "express";
import jwt from "jsonwebtoken";

//Token Creation
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    // Hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    // Create Token
    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      // if it does not, user is null
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // otherwise, we check if the password matches the typed password by the user
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// Admin Login (example: checks for admin email)
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // You can add more robust admin checks here
    const user = await userModel.findOne({ email });
    if (!user || !user.email.endsWith("@admin.com")) {
      return res.status(403).json({ message: "Not authorized as admin" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, admin: true },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).json({ message: "Admin login successful", token, user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Admin login failed", error: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
