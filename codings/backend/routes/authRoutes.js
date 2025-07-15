const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../utils/multerConfig"); // Import multer upload config

// POST /api/create-user - Create a new user
router.post("/create-user", upload.single("photo"), async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      phone,
      Address, // Note: Case sensitive, ensure it matches frontend
      joinedDate,
      course,
      isAdmin,
    } = req.body;

    // Check if user with email or username already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this username already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Get photo path if uploaded
    const photoPath = req.file ? `/uploads/${req.file.filename}` : null;

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      address: Address,
      joinedDate: joinedDate || Date.now(),
      course,
      isAdmin: isAdmin === "true", // Convert string 'true'/'false' to boolean
      photo: photoPath,
    });

    const savedUser = await newUser.save();

    // Generate a JWT token
    const token = jwt.sign(
      { id: savedUser._id, isAdmin: savedUser.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        isAdmin: savedUser.isAdmin,
        photo: savedUser.photo,
      },
      token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST /api/login - User login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        photo: user.photo,
      },
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/verify-token - Verify token and return user data
router.get("/verify-token", protect, async (req, res) => {
  try {
    res.status(200).json({
      message: "Token verified",
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
        photo: req.user.photo,
      },
    });
  } catch (error) {
    console.error("Error in /api/verify-token:", error);
    res.status(500).json({
      message: "Server error during token verification",
      error: error.message,
    });
  }
});

// Example protected route
router.get("/protected", protect, (req, res) => {
  res.json({
    message: `Welcome, ${req.user.username}! This is a protected route.`,
    user: req.user,
  });
});

module.exports = router;
