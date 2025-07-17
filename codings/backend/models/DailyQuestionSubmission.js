const mongoose = require("mongoose");

const dailyQuestionSubmissionSchema = new mongoose.Schema(
  {
    daily_question_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DailyQuestion",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    answer_text: {
      type: String,
      required: true,
      trim: true,
    },
    is_correct: {
      type: Boolean,
      default: false, // Admins can mark this after review
    },
    points_awarded: {
      type: Number,
      default: 0, // Default to 0 points. Set upon marking as correct.
      min: 0, // Points should not be negative
    },
    // submitted_at is handled by timestamps: true (createdAt)
  },
  {
    timestamps: true, // Adds createdAt (for submitted_at) and updatedAt
  }
);

// Ensure a user can only submit once per daily question
dailyQuestionSubmissionSchema.index(
  { daily_question_id: 1, user_id: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "DailyQuestionSubmission",
  dailyQuestionSubmissionSchema
);
