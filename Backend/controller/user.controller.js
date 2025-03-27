import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import createTokenAndSaveCookie from '../jwt/generateToken.js';
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body;

  try {
    // Validate input fields
    if (!fullname || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already registered" });
    }

    // Validate password strength (optional but recommended)
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    // Hashing the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullname,
      email,
      password: hashPassword,
    });

    // Save user to database
    await newUser.save();

    // Create token and save cookie
    createTokenAndSaveCookie(newUser._id, res);

    // Respond with user details (excluding password)
    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.error("Signup error:", error);
    
    // More detailed error handling
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: "Validation failed", 
        details: Object.values(error.errors).map(err => err.message) 
      });
    }

    res.status(500).json({ 
      error: "Internal server error", 
      message: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate and save JWT token in cookies
    createTokenAndSaveCookie(user._id, res); // Set the cookie with the generated JWT token

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ 
      error: "Internal server error", 
      message: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
};

export const allUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;  // Use 'user' instead of 'User'
    const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password -confirmpassword");

    res.status(200).json({ filteredUsers });
  } catch (error) {
    console.error("Error in getUserProfile Controller:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
