// backend/routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const db = require("../config/db");
const { authenticateToken } = require("../middleware/auth");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/profiles/";
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "profile-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    // Check file type
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

/**
 * Create user endpoint
 * POST /api/create-user
 * Body: FormData with all user fields including photo
 */
router.post("/create-user", upload.single("photo"), async (req, res) => {
  const {
    username,
    email,
    password,
    confirmPassword,
    phone,
    Address,
    joinedDate,
    course,
    isAdmin,
  } = req.body;

  try {
    // Validate required fields
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Username, email, password, and confirm password are required",
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if username already exists
    const [existingUsers] = await db.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (existingUsers.length > 0) {
      const existingUser = existingUsers[0];
      if (existingUser.username === username) {
        return res.status(400).json({ message: "Username already exists" });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get photo path if uploaded
    const photoPath = req.file ? req.file.path : null;

    // Parse joinedDate or use current date
    const parsedJoinedDate = joinedDate ? new Date(joinedDate) : new Date();

    // Insert new user with all fields
    const [result] = await db.query(
      `INSERT INTO users (
        username, 
        email, 
        password, 
        phone, 
        address, 
        joined_date, 
        course, 
        photo_path, 
        isAdmin,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        username,
        email,
        hashedPassword,
        phone || null,
        Address || null,
        parsedJoinedDate,
        course || null,
        photoPath,
        isAdmin ? 1 : 0,
      ]
    );

    // Return success response without sensitive data
    res.status(201).json({
      message: "User created successfully",
      userId: result.insertId,
      user: {
        id: result.insertId,
        username,
        email,
        phone: phone || null,
        address: Address || null,
        joined_date: parsedJoinedDate,
        course: course || null,
        photo_path: photoPath,
        isAdmin: isAdmin ? true : false,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);

    // Delete uploaded file if there was an error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Get user profile with photo
 * GET /api/user/:id
 */
router.get("/user/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user is trying to access their own profile or is admin
    if (req.user.id !== parseInt(userId) && !req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    const [rows] = await db.query(
      `SELECT 
        id, username, email, phone, address, joined_date, 
        course, photo_path, isAdmin, created_at, updated_at 
       FROM users WHERE id = ?`,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];
    res.json({
      ...user,
      isAdmin: !!user.isAdmin,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Serve profile photos
 * GET /api/photo/:filename
 */
router.get("/photo/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads/profiles/", filename);

  // Check if file exists
  if (fs.existsSync(filePath)) {
    res.sendFile(path.resolve(filePath));
  } else {
    res.status(404).json({ message: "Photo not found" });
  }
});

/**
 * Update user profile
 * PUT /api/user/:id
 */
router.put(
  "/user/:id",
  authenticateToken,
  upload.single("photo"),
  async (req, res) => {
    try {
      const userId = req.params.id;

      // Check if user is trying to update their own profile or is admin
      if (req.user.id !== parseInt(userId) && !req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied" });
      }

      const { username, email, phone, Address, course } = req.body;

      // Build update query dynamically
      const updateFields = [];
      const updateValues = [];

      if (username) {
        updateFields.push("username = ?");
        updateValues.push(username);
      }
      if (email) {
        updateFields.push("email = ?");
        updateValues.push(email);
      }
      if (phone !== undefined) {
        updateFields.push("phone = ?");
        updateValues.push(phone);
      }
      if (Address !== undefined) {
        updateFields.push("address = ?");
        updateValues.push(Address);
      }
      if (course !== undefined) {
        updateFields.push("course = ?");
        updateValues.push(course);
      }
      if (req.file) {
        updateFields.push("photo_path = ?");
        updateValues.push(req.file.path);
      }

      if (updateFields.length === 0) {
        return res.status(400).json({ message: "No fields to update" });
      }

      updateFields.push("updated_at = NOW()");
      updateValues.push(userId);

      const query = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`;

      await db.query(query, updateValues);

      res.json({ message: "User updated successfully" });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/**
 * Login endpoint (updated to return more user info)
 * POST /api/login
 * Body: { username, password }
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists (allow login with username or email)
    const [rows] = await db.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: !!user.isAdmin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // Return token and user info (without password)
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        joined_date: user.joined_date,
        course: user.course,
        photo_path: user.photo_path,
        isAdmin: !!user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Get all users (admin only)
 * GET /api/users
 */
router.get("/users", authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    const [rows] = await db.query(
      `SELECT 
        id, username, email, phone, address, joined_date, 
        course, photo_path, isAdmin, created_at, updated_at 
       FROM users 
       ORDER BY created_at DESC`
    );

    const users = rows.map((user) => ({
      ...user,
      isAdmin: !!user.isAdmin,
    }));

    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Delete user (admin only)
 * DELETE /api/user/:id
 */
router.delete("/user/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    // Don't allow admin to delete themselves
    if (req.user.id === parseInt(userId)) {
      return res
        .status(400)
        .json({ message: "Cannot delete your own account" });
    }

    // Get user photo path before deletion
    const [userRows] = await db.query(
      "SELECT photo_path FROM users WHERE id = ?",
      [userId]
    );

    // Delete user
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete photo file if it exists
    if (userRows.length > 0 && userRows[0].photo_path) {
      const photoPath = userRows[0].photo_path;
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Verify token endpoint
 * GET /api/verify-token
 * Headers: { Authorization: 'Bearer YOUR_TOKEN' }
 */
router.get("/verify-token", authenticateToken, (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  });
});

module.exports = router;
