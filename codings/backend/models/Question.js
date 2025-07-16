const express = require("express");
const router = express.Router();
const CourseTopic = require("../models/CourseTopic"); // Import CourseTopic
const Question = require("../models/Question");
const { protect } = require("../middleware/authMiddleware");

// ... (CourseTopic Routes - These are now in courseRoutes.js)

// --- Question Routes ---

// POST /api/questions - Create a new question (Admin only)
router.post("/questions", protect, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }
    // Removed is_completed from destructuring
    const { course_topic_id, question_text } = req.body;

    // Check if the parent course topic exists
    const parentTopic = await CourseTopic.findById(course_topic_id);
    if (!parentTopic) {
      return res.status(404).json({ message: "Parent course topic not found" });
    }

    const newQuestion = new Question({
      course_topic_id,
      question_text,
      // Removed is_completed assignment
    });
    const savedQuestion = await newQuestion.save();
    res.status(201).json({
      message: "Question created successfully",
      question: savedQuestion,
    });
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/questions - Get all questions (optionally by course_topic_id)
router.get("/questions", async (req, res) => {
  try {
    const { course_topic_id } = req.query;
    let query = {};
    if (course_topic_id) {
      query.course_topic_id = course_topic_id;
    }
    const questions = await Question.find(query).populate(
      "course_topic_id",
      "course_topic_name is_completed" // Can still populate is_completed from topic
    );
    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/questions/:id - Get a single question by ID
router.get("/questions/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate(
      "course_topic_id",
      "course_topic_name is_completed" // Can still populate is_completed from topic
    );
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({ question });
  } catch (error) {
    console.error("Error fetching question by ID:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT /api/questions/:id - Update a question (Admin only)
router.put("/questions/:id", protect, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }
    // Ensure is_completed is NOT updated here
    const updates = req.body;
    delete updates.is_completed; // Explicitly remove if sent

    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({
      message: "Question updated successfully",
      question: updatedQuestion,
    });
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE /api/questions/:id - Delete a question (Admin only)
router.delete("/questions/:id", protect, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;