// server.js
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs"); // For file system operations

// Load environment variables from .env file
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key"; // Replace with a strong secret in production
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/userdb"; // Replace with your MongoDB URI

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use("/uploads", express.static(uploadsDir)); // Serve static files from the 'uploads' directory

// MongoDB Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema (Mongoose)
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    joinedDate: {
      type: Date,
      default: Date.now,
    },
    course: {
      type: String,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    photo: {
      type: String, // Store the path to the photo
      default: null,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const User = mongoose.model("User", userSchema);

// Multer storage configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); // Files will be stored in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    // Generate a unique filename: fieldname-timestamp.ext
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Middleware to protect routes (authenticate token)
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Attach user from the token payload to the request
      // Optionally, fetch the full user object from DB for more up-to-date info
      req.user = await User.findById(decoded.id).select("-password"); // Exclude password from user object

      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      next();
    } catch (error) {
      console.error("Token verification error:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Routes

// POST /api/create-user - Create a new user
app.post("/api/create-user", upload.single("photo"), async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      phone,
      Address,
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
      address: Address, // Ensure this matches your frontend field name
      joinedDate: joinedDate || Date.now(),
      course,
      isAdmin: isAdmin === "true", // Convert string 'true'/'false' to boolean
      photo: photoPath,
    });

    const savedUser = await newUser.save();

    // Optionally, generate a JWT token for the newly created user (auto-login after registration)
    const token = jwt.sign(
      { id: savedUser._id, isAdmin: savedUser.isAdmin },
      JWT_SECRET,
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
        photo: savedUser.photo, // Return the photo path
      },
      token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    // Handle Mongoose validation errors or other errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST /api/login - User login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 2. Compare provided password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      JWT_SECRET,
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    // 4. Send success response with token and user info
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
app.get("/api/verify-token", protect, async (req, res) => {
  try {
    // The 'protect' middleware has already verified the token and attached the user object to req.user
    // We can now send back the user data (excluding sensitive info like password)
    res.status(200).json({
      message: "Token verified",
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
        photo: req.user.photo,
        // Add any other user fields you need on the frontend
      },
    });
  } catch (error) {
    console.error("Error in /api/verify-token:", error);
    // Errors from 'protect' middleware are already handled there,
    // but this catch block is for any errors specific to this route's logic.
    res
      .status(500)
      .json({
        message: "Server error during token verification",
        error: error.message,
      });
  }
});

// Example protected route (can be used later)
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: `Welcome, ${req.user.username}! This is a protected route.`,
    user: req.user,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access the backend at http://localhost:${PORT}`);
});
