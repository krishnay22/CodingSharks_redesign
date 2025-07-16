// models/DailyQuestion.js
const mongoose = require("mongoose");

const dailyQuestionSchema = new mongoose.Schema(
  {
    question_text: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      // in minutes
      type: Number,
      required: true,
      min: 0,
    },
    is_active: {
      type: Boolean,
      default: false,
    },
    // NEW FIELD: Timestamp when the question became active
    startTime: {
      type: Date,
      default: null, // It will be set when the admin posts it
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DailyQuestion", dailyQuestionSchema);
