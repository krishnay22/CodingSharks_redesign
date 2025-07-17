// your-existing-backend/routes/studentWorkRoutes.js
const express = require("express");
const router = express.Router();
const StudentWork = require("../models/StudentWork");
const upload = require("../utils/multerConfig"); // Path to your existing generic upload middleware
const { protect } = require("../middleware/authMiddleware"); // Path to your existing auth middleware

// REMOVED: const cloudinary = require('cloudinary').v2;
// REMOVED: const fs = require('fs'); // Only needed if you wanted to delete files after upload
// REMOVED: const path = require('path');

// REMOVED: Cloudinary configuration

// REMOVED: uploadToCloudinary helper function

// @desc    Upload a new student work entry
// @route   POST /api/student-work
// @access  Private (requires authentication)
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the 'protect' middleware
    const { title, description, date, url } = req.body;

    // Basic validation
    if (!title || !description || !date) {
      // If validation fails, and a file was uploaded by Multer, delete it.
      // You might want to keep the fs.unlinkSync logic here if you strictly
      // want to delete files that fail validation, even after local save.
      // For simplicity, we'll assume valid uploads are kept.
      return res.status(400).json({
        message: "Please include title, description, and completion date.",
      });
    }

    let imageUrl = null;

    // If Multer processed a file, it will be available at req.file
    if (req.file) {
      // imageUrl will now be the path that the frontend can use to access the image.
      // Assuming your server.js serves '/uploads' statically, the path will be something like '/uploads/image-167891234.png'
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const newStudentWork = await StudentWork.create({
      title,
      description,
      user: userId, // Link to the authenticated user's ID
      date,
      url,
      imageUrl, // Store the local URL path
      // REMOVED: cloudinaryId
    });

    // Populate user details for the response
    await newStudentWork.populate("user", "username email");

    res.status(201).json({
      message: "Student work uploaded successfully!",
      work: newStudentWork,
    });
  } catch (error) {
    console.error("Error in student work submission route:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @desc    Get all student work entries
// @route   GET /api/student-work
// @access  Public (or private if only specific users can view)
router.get("/", async (req, res) => {
  try {
    const studentWorks = await StudentWork.find()
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.json({ works: studentWorks });
  } catch (error) {
    console.error("Error fetching student work:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
