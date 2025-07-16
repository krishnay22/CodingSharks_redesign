const express = require("express");
const router = express.Router();
const CourseTopic = require("../models/CourseTopic");
const Question = require("../models/Question");
const { protect } = require("../middleware/authMiddleware");

// --- CourseTopic Routes ---

// POST /api/topics - Create a new course topic (Admin only)
router.post("/topics", protect, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }
    const { sub_course_id, course_topic_name, description } = req.body;

    // Check if the parent sub-course exists
    const parentSubCourse = await SubCourse.findById(sub_course_id);
    if (!parentSubCourse) {
      return res.status(404).json({ message: "Parent sub-course not found" });
    }

    const newTopic = new CourseTopic({
      sub_course_id,
      course_topic_name,
      description,
    });
    const savedTopic = await newTopic.save();
    res.status(201).json({
      message: "Course topic created successfully",
      topic: savedTopic,
    });
  } catch (error) {
    console.error("Error creating course topic:", error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({
          message: "Course topic name already exists for this sub-course",
        });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/topics - Get all course topics (optionally by sub_course_id)
router.get("/topics", async (req, res) => {
  try {
    const { sub_course_id } = req.query;
    let query = {};
    if (sub_course_id) {
      query.sub_course_id = sub_course_id;
    }
    const topics = await CourseTopic.find(query).populate(
      "sub_course_id",
      "sub_course_name"
    );
    res.status(200).json({ topics });
  } catch (error) {
    console.error("Error fetching course topics:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/topics/:id - Get a single course topic by ID
router.get("/topics/:id", async (req, res) => {
  try {
    const topic = await CourseTopic.findById(req.params.id).populate(
      "sub_course_id",
      "sub_course_name"
    );
    if (!topic) {
      return res.status(404).json({ message: "Course topic not found" });
    }
    res.status(200).json({ topic });
  } catch (error) {
    console.error("Error fetching course topic by ID:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT /api/topics/:id - Update a course topic (Admin only)
router.put("/topics/:id", protect, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }
    const updatedTopic = await CourseTopic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTopic) {
      return res.status(404).json({ message: "Course topic not found" });
    }
    res.status(200).json({
      message: "Course topic updated successfully",
      topic: updatedTopic,
    });
  } catch (error) {
    console.error("Error updating course topic:", error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({
          message: "Course topic name already exists for this sub-course",
        });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE /api/topics/:id - Delete a course topic (Admin only)
router.delete("/topics/:id", protect, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }
    const topicId = req.params.id;

    // Optional: Delete related questions
    await Question.deleteMany({ course_topic_id: topicId });

    const deletedTopic = await CourseTopic.findByIdAndDelete(topicId);
    if (!deletedTopic) {
      return res.status(404).json({ message: "Course topic not found" });
    }
    res.status(200).json({ message: "Course topic deleted successfully" });
  } catch (error) {
    console.error("Error deleting course topic:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// --- Question Routes ---

// POST /api/questions - Create a new question (Admin only)
router.post("/questions", protect, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }
    const { course_topic_id, question_text, is_completed } = req.body;

    // Check if the parent course topic exists
    const parentTopic = await CourseTopic.findById(course_topic_id);
    if (!parentTopic) {
      return res.status(404).json({ message: "Parent course topic not found" });
    }

    const newQuestion = new Question({
      course_topic_id,
      question_text,
      is_completed: is_completed === "true",
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
      "course_topic_name"
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
      "course_topic_name"
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
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
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
