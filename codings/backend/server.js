// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import routes - make sure these files exist and export router correctly
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");
const adminRoutes = require("./routes/admin");
const courseRoutes = require("./routes/courseRoutes");
const questionRoutes = require("./routes/questionRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies

// Mount routes - this is likely where the error is happening
app.use("/api", authRoutes); // Make sure authRoutes is a router
app.use("/api", protectedRoutes); // Make sure protectedRoutes is a router
app.use("/api", adminRoutes); // Make sure adminRoutes is a router

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/api/courses", courseRoutes);
app.use("/api/questions", questionRoutes);

// Add this to your main server file (app.js or server.js)
app.use("/uploads", express.static("uploads"));
