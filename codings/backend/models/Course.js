const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    course_name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    sub_course_ids: [
      // <-- NEW FIELD: Array of SubCourse ObjectIds
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCourse", // References the SubCourse model
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
