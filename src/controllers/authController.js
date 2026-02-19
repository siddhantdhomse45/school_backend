import User from "../models/User.js";
import jwt from "jsonwebtoken";




/* ================= REGISTER ================= */
export const registerUser = async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);

    const { username, password, role } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        message: "Username already exists"
      });
    }

    // Create user (RAW password)
    const user = await User.create({
      username,
      password,
      role: role || "admin"
    });

    // Token (optional on register)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    console.log("👉 LOGIN BODY:", req.body);

    // Block array payload
    if (Array.isArray(req.body)) {
      return res.status(400).json({
        message: "Invalid login payload format"
      });
    }

    const { username, password } = req.body;

    // Validate fields
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required"
      });
    }

    // Find user
    const user = await User.findOne({ username });

    console.log("👉 USER FOUND:", user);

    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    // RAW password check (dummy data)
    if (user.password !== password) {
      return res.status(401).json({
        message: "Incorrect password"
      });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    // Success
    return res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      },
      token
    });

  } catch (error) {
    console.error("❌ LOGIN ERROR:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};
