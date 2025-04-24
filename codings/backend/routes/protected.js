// backend/routes/protected.js
const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");

/**
 * Example of a protected route (requires authentication)
 * GET /api/protected
 * Headers: { Authorization: 'Bearer YOUR_TOKEN' }
 */
router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;
