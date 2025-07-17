const express = require("express");
const router = express.Router();
const DailyQuestion = require("../models/DailyQuestion");
const DailyQuestionSubmission = require("../models/DailyQuestionSubmission");
const { protect } = require("../middleware/authMiddleware"); // Import protect middleware

// In routes/dailyQuestionRoutes.js, add this route:
// --- Helper function for admin check (assuming protect middleware adds req.user) ---
const checkAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: "Not authorized as an admin" });
  }
  next();
};

// @desc    Mark a daily question submission as correct and assign points
// @route   POST /api/daily-questions/submissions/:id/grade
// @access  Admin
router.post(
  "/daily-questions/submissions/:id/grade",
  protect,
  checkAdmin,
  async (req, res) => {
    const { id } = req.params; // Submission ID
    const { is_correct, points_awarded } = req.body; // Expecting boolean for is_correct and number for points_awarded

    // Basic validation for input
    if (
      typeof is_correct !== "boolean" ||
      typeof points_awarded !== "number" ||
      points_awarded < 0
    ) {
      return res
        .status(400)
        .json({
          message:
            "Invalid input: is_correct must be a boolean, points_awarded must be a non-negative number.",
        });
    }

    try {
      const submission = await DailyQuestionSubmission.findById(id);

      if (!submission) {
        return res
          .status(404)
          .json({ message: "Daily question submission not found" });
      }

      // Update the submission
      submission.is_correct = is_correct;
      submission.points_awarded = is_correct ? points_awarded : 0; // Only award points if marked correct

      await submission.save();

      // The functionality to update the user's total points has been removed as per your request.
      // If you need to manage user points, you would do it outside of this grading route,
      // or re-implement it based on different logic.

      res.status(200).json({
        message: "Submission updated successfully",
        submission: submission,
        // userUpdated and userNewTotalPoints removed as user points are no longer updated here
      });
    } catch (error) {
      console.error("Error grading daily question submission:", error);
      // Handle Mongoose validation errors or other server errors
      if (error.name === "ValidationError") {
        return res
          .status(400)
          .json({ message: error.message, errors: error.errors });
      }
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);
// GET /api/daily-questions/submissions - Get ALL submissions (Admin only)
router.get("/daily-questions/submissions", protect, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }

    const submissions = await DailyQuestionSubmission.find({})
      .populate("user_id", "username email") // Populate user details
      .populate("daily_question_id", "question_text"); // Populate question text

    res.status(200).json({ submissions });
  } catch (error) {
    console.error("Error fetching all daily question submissions:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// --- DailyQuestion Routes (Admin Only for Creation/Management) ---

// POST /api/daily-questions - Create a new daily question (Admin only)
router.post("/daily-questions", protect, async (req, res) => {
  try {
    // Ensure only admins can post questions
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }

    const { question_text, duration } = req.body;

    // Basic validation for required fields and duration
    if (!question_text || typeof duration === "undefined" || duration <= 0) {
      return res.status(400).json({
        message: "Question text and a positive duration are required.",
      });
    }

    // Deactivate any currently active question and clear its startTime
    // This ensures only one question is active at a time and its timer effectively ends.
    await DailyQuestion.updateMany(
      { is_active: true },
      { is_active: false, startTime: null } // Set startTime to null for deactivated questions
    );

    // Create the new question with the current timestamp as its startTime
    const newQuestion = new DailyQuestion({
      question_text,
      duration,
      is_active: true, // New question is automatically active
      startTime: new Date(), // Set the current server time as the question's start time
    });

    const savedQuestion = await newQuestion.save();

    res.status(201).json({
      message: "Daily question created and set as active successfully",
      question: savedQuestion,
    });
  } catch (error) {
    console.error("Error creating daily question:", error);
    // Provide a more specific error message if it's a validation error from Mongoose
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// GET /api/daily-questions/active - Get the currently active daily question (for students/any user)
router.get("/daily-questions/active", async (req, res) => {
  try {
    const activeQuestion = await DailyQuestion.findOne({ is_active: true });

    if (!activeQuestion) {
      return res
        .status(404)
        .json({ message: "No active daily question found." });
    }

    res.status(200).json({ question: activeQuestion });
  } catch (error) {
    console.error("Error fetching active daily question:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/daily-questions/:id - Get a specific daily question by ID (Admin or for historical viewing)
router.get("/daily-questions/:id", async (req, res) => {
  try {
    const question = await DailyQuestion.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Daily question not found." });
    }
    res.status(200).json({ question });
  } catch (error) {
    console.error("Error fetching daily question by ID:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT /api/daily-questions/:id - Update a daily question (Admin only)
router.put("/daily-questions/:id", protect, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }

    const { is_active, ...updates } = req.body; // Destructure is_active separately

    // If attempting to set this question as active, deactivate others first
    if (is_active === true) {
      await DailyQuestion.updateMany({ is_active: true }, { is_active: false });
      updates.is_active = true; // Ensure it's set to true in updates
    } else if (is_active === false) {
      updates.is_active = false; // Allow deactivating a specific question
    }

    const updatedQuestion = await DailyQuestion.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Daily question not found." });
    }
    res.status(200).json({
      message: "Daily question updated successfully",
      question: updatedQuestion,
    });
  } catch (error) {
    console.error("Error updating daily question:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE /api/daily-questions/:id - Delete a daily question (Admin only)
router.delete("/daily-questions/:id", protect, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }

    const questionId = req.params.id;

    // Optional: Delete all submissions related to this question
    await DailyQuestionSubmission.deleteMany({ daily_question_id: questionId });

    const deletedQuestion = await DailyQuestion.findByIdAndDelete(questionId);
    if (!deletedQuestion) {
      return res.status(404).json({ message: "Daily question not found." });
    }
    res.status(200).json({
      message: "Daily question and its submissions deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting daily question:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/daily-questions - Get all daily questions (Admin only)
router.get("/daily-questions", protect, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }
    const questions = await DailyQuestion.find({});
    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error fetching all daily questions:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// --- DailyQuestionSubmission Routes ---

// POST /api/daily-questions/submit - Submit an answer to the active daily question (User only)
router.post("/daily-questions/submit", protect, async (req, res) => {
  try {
    const { daily_question_id, answer_text } = req.body;
    const userId = req.user.id; // User ID from the authenticated token

    // 1. Basic input validation
    if (!daily_question_id || !answer_text || !answer_text.trim()) {
      return res
        .status(400)
        .json({ message: "Question ID and answer text are required." });
    }

    // 2. Find the active question
    const activeQuestion = await DailyQuestion.findById(daily_question_id);

    if (!activeQuestion || !activeQuestion.is_active) {
      return res
        .status(404)
        .json({ message: "Daily question not found or is not active." });
    }

    // 3. Check if the user has already submitted for this question
    const existingSubmission = await DailyQuestionSubmission.findOne({
      daily_question_id: activeQuestion._id,
      user_id: userId,
    });

    if (existingSubmission) {
      return res.status(409).json({
        message: "You have already submitted an answer for this question.",
      });
    }

    // 4. Check if the submission is within the time limit
    const questionStartTime = new Date(activeQuestion.startTime).getTime(); // Milliseconds
    const durationInMs = activeQuestion.duration * 60 * 1000; // Convert minutes to milliseconds
    const submissionDeadline = questionStartTime + durationInMs;
    const currentTime = new Date().getTime();

    if (currentTime > submissionDeadline) {
      return res
        .status(403)
        .json({ message: "Submission deadline has passed for this question." });
    }

    // 5. Create and save the new submission
    const newSubmission = new DailyQuestionSubmission({
      daily_question_id: activeQuestion._id,
      user_id: userId,
      answer_text: answer_text.trim(),
    });

    const savedSubmission = await newSubmission.save();

    res.status(201).json({
      message: "Answer submitted successfully!",
      submission: savedSubmission,
    });
  } catch (error) {
    console.error("Error submitting answer:", error);

    // Handle duplicate key error from the unique index (if somehow passed the initial check)
    if (error.code === 11000) {
      // MongoDB duplicate key error code
      return res.status(409).json({
        message: "You have already submitted an answer for this question.",
      });
    }

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// GET /api/daily-questions/:questionId/submissions - Get all submissions for a specific question (Admin only)
router.get(
  "/daily-questions/:questionId/submissions",
  protect,
  async (req, res) => {
    try {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Not authorized as an admin" });
      }

      const { questionId } = req.params;
      const submissions = await DailyQuestionSubmission.find({
        daily_question_id: questionId,
      })
        .populate("user_id", "username email") // Populate user details
        .populate("daily_question_id", "question_text"); // Populate question text

      res.status(200).json({ submissions });
    } catch (error) {
      console.error("Error fetching submissions for question:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// GET /api/daily-questions/submissions/user/:userId - Get all submissions by a specific user (Admin or User themselves)
router.get(
  "/daily-questions/submissions/user/:userId",
  protect,
  async (req, res) => {
    try {
      const { userId } = req.params;

      // Allow admin to view any user's submissions, or user to view their own
      if (!req.user.isAdmin && req.user._id.toString() !== userId) {
        return res
          .status(403)
          .json({ message: "Not authorized to view these submissions." });
      }

      const submissions = await DailyQuestionSubmission.find({
        user_id: userId,
      })
        .populate("daily_question_id", "question_text") // Populate question text
        .populate("user_id", "username email"); // Populate user details

      res.status(200).json({ submissions });
    } catch (error) {
      console.error("Error fetching user submissions:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// GET /api/daily-questions/submissions/:id - Get a specific submission by ID (Admin or User themselves)
router.get("/daily-questions/submissions/:id", protect, async (req, res) => {
  try {
    const submission = await DailyQuestionSubmission.findById(req.params.id)
      .populate("daily_question_id", "question_text")
      .populate("user_id", "username email");

    if (!submission) {
      return res.status(404).json({ message: "Submission not found." });
    }

    // Allow admin to view any submission, or user to view their own
    if (
      !req.user.isAdmin &&
      req.user._id.toString() !== submission.user_id._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this submission." });
    }

    res.status(200).json({ submission });
  } catch (error) {
    console.error("Error fetching submission by ID:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT /api/daily-questions/submissions/:id - Update a submission (e.g., mark as correct/incorrect) (Admin only)
router.put("/daily-questions/submissions/:id", protect, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }

    const { is_correct } = req.body;
    const updates = { is_correct }; // Only allow updating is_correct for now

    const updatedSubmission = await DailyQuestionSubmission.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedSubmission) {
      return res.status(404).json({ message: "Submission not found." });
    }
    res.status(200).json({
      message: "Submission updated successfully",
      submission: updatedSubmission,
    });
  } catch (error) {
    console.error("Error updating submission:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE /api/daily-questions/submissions/:id - Delete a submission (Admin only)
router.delete("/daily-questions/submissions/:id", protect, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }
    const deletedSubmission = await DailyQuestionSubmission.findByIdAndDelete(
      req.params.id
    );
    if (!deletedSubmission) {
      return res.status(404).json({ message: "Submission not found." });
    }
    res.status(200).json({ message: "Submission deleted successfully." });
  } catch (error) {
    console.error("Error deleting submission:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
