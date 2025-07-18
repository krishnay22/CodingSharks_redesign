// backend/models/Course.js
const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    topics: [
      {
        id_string: { type: String, required: true },
        name: { type: String, required: true },
        subtopics: [
          {
            id_string: { type: String, required: true },
            name: { type: String, required: true },
            questionsFile: { type: String },
          },
        ],
      },
    ],
    total_subtopics_count: {
      type: Number,
      default: 0,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to calculate total_subtopics_count
CourseSchema.pre("save", function (next) {
  let count = 0;
  this.topics.forEach((topic) => {
    count += topic.subtopics.length;
  });
  this.total_subtopics_count = count;
  next();
});

// THIS IS THE MOST IMPORTANT LINE FOR THE ERROR YOU'RE GETTING:
module.exports = mongoose.model("Course", CourseSchema);
