// backend/routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../config/db");
const { authenticateToken } = require("../middleware/auth");

/**
 * Create user endpoint
 * POST /api/create-user
 * Body: { username, password, isAdmin }
 */
router.post("/create-user", async (req, res) => {
  const { username, password, isAdmin } = req.body;

  try {
    // Check if username already exists
    const [existingUsers] = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await db.query(
      "INSERT INTO users (username, password, isAdmin) VALUES (?, ?, ?)",
      [username, hashedPassword, isAdmin ? 1 : 0]
    );

    res
      .status(201)
      .json({ message: "User created successfully", userId: result.insertId });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Login endpoint
 * POST /api/login
 * Body: { username, password }
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = rows[0];

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        isAdmin: !!user.isAdmin, // Convert to boolean
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Return token, username and isAdmin status
    res.json({
      token,
      username: user.username,
      isAdmin: !!user.isAdmin, // Send isAdmin status to the client
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Verify token endpoint - useful for checking if token is valid on frontend
 * GET /api/verify-token
 * Headers: { Authorization: 'Bearer YOUR_TOKEN' }
 */
router.get("/verify-token", authenticateToken, (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    isAdmin: req.user.isAdmin,
  });
});

module.exports = router;
