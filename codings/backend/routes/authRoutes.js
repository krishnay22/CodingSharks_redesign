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
      Address,
      joinedDate,
      course_id, // Now expecting course_id
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
      course_id: course_id || null, // Assign course_id if provided
      isAdmin: isAdmin === "true",
      photo: photoPath,
    });

    const savedUser = await newUser.save();

    // Generate a JWT token
    const token = jwt.sign(
      { id: savedUser._id, isAdmin: savedUser.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
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
        course_id: savedUser.course_id, // Include course_id in response
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

    // Populate course_id when fetching user
    const user = await User.findOne({ email }).populate(
      "course_id",
      "course_name"
    );
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
        course_id: user.course_id, // Include populated course_id in response
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
    // Re-fetch user with populated course_id for the latest data
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate("course_id", "course_name");

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found after token verification" });
    }

    res.status(200).json({
      message: "Token verified",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        photo: user.photo,
        course_id: user.course_id, // Include populated course_id in response
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

// PUT /api/users/:id - Update user (e.g., enroll in a course)
router.put("/users/:id", protect, upload.single("photo"), async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;
    let photoPath = req.file ? `/uploads/${req.file.filename}` : null;

    // Only allow admin or the user themselves to update
    if (req.user.isAdmin === false && req.user._id.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this user" });
    }

    // Handle password update separately if provided
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    // If a new photo is uploaded, update the photo path
    if (photoPath) {
      updates.photo = photoPath;
    } else if (updates.photo === null) {
      // Allow setting photo to null if explicitly sent
      updates.photo = null;
    }

    // Convert isAdmin string to boolean if present
    if (typeof updates.isAdmin === "string") {
      updates.isAdmin = updates.isAdmin === "true";
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true, // Return the updated document
      runValidators: true, // Run Mongoose validators on update
    })
      .select("-password")
      .populate("course_id", "course_name"); // Exclude password and populate course_id

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE /api/users/:id - Delete a user (Admin only)
router.delete("/users/:id", protect, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }

    const userId = req.params.id;
    const userToDelete = await User.findById(userId);

    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete associated photo file if it exists
    if (userToDelete.photo) {
      const photoPath = path.join(__dirname, "..", userToDelete.photo);
      fs.unlink(photoPath, (err) => {
        if (err) console.error("Error deleting user photo file:", err);
      });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/users - Get all users (Admin only)
router.get("/users", protect, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }

    const users = await User.find({})
      .select("-password")
      .populate("course_id", "course_name"); // Exclude passwords and populate course_id
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/users/:id - Get a single user by ID (Admin or self)
router.get("/users/:id", protect, async (req, res) => {
  try {
    const userId = req.params.id;

    // Allow admin to view any user, or a user to view their own profile
    if (req.user.isAdmin === false && req.user._id.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this user's profile" });
    }

    const user = await User.findById(userId)
      .select("-password")
      .populate("course_id", "course_name");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
