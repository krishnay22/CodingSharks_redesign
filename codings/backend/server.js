const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes"); // NEW
const questionRoutes = require("./routes/questionRoutes"); // NEW

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadsDir));

// API Routes
app.use("/api", authRoutes);
app.use("/api", courseRoutes); // NEW
app.use("/api", questionRoutes); // NEW

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access the backend at http://localhost:${PORT}`);
});
