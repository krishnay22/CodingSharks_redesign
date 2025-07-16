const mongoose = require("mongoose");

const subCourseSchema = new mongoose.Schema(
  {
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    sub_course_name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    // Ensure uniqueness of sub_course_name within a given course
    // unique: [true, "Sub-course name must be unique within its course"], // This requires a compound index
  },
  {
    timestamps: true,
  }
);

// Add a compound unique index to ensure sub_course_name is unique per course_id
subCourseSchema.index({ course_id: 1, sub_course_name: 1 }, { unique: true });

module.exports = mongoose.model("SubCourse", subCourseSchema);
