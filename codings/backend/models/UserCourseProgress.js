// backend/models/UserCourseProgress.js
const mongoose = require("mongoose");

const UserCourseProgressSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    completed_subtopics: [
      {
        subtopic_mongoose_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        completed_at: { type: Date, default: Date.now },
      },
    ],
    progress_percentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    is_completed: {
      type: Boolean,
      default: false,
    },
    last_progress_update: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

UserCourseProgressSchema.index({ user_id: 1, course_id: 1 }, { unique: true });

// THIS LINE IS CRUCIAL:
module.exports = mongoose.model("UserCourseProgress", UserCourseProgressSchema);
