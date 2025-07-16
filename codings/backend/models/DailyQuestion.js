const mongoose = require("mongoose");

const dailyQuestionSchema = new mongoose.Schema(
  {
    question_text: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: Number, // Duration in minutes (e.g., 60 for 1 hour)
      default: 0, // 0 means no specific time limit
    },
    is_active: {
      type: Boolean,
      default: false, // Only one question should be active at a time
    },
    // You could add fields like `correct_answer` if it's a fixed answer question
    // correct_answer: {
    //   type: String,
    //   trim: true,
    //   default: null
    // },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("DailyQuestion", dailyQuestionSchema);
