// backend/routes/admin.js
const express = require("express");
const router = express.Router();
const { authenticateToken, isAdmin } = require("../middleware/auth");

/**
 * Example of an admin-only route
 * GET /api/admin
 * Headers: { Authorization: 'Bearer YOUR_TOKEN' }
 */
router.get("/admin", authenticateToken, isAdmin, (req, res) => {
  res.json({ message: "Admin access granted" });
});

module.exports = router;
