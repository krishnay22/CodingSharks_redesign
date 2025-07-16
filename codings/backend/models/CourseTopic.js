const mongoose = require("mongoose");

const courseTopicSchema = new mongoose.Schema(
  {
    sub_course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCourse",
      required: true,
    },
    course_topic_name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    is_completed: {
      // <-- NEW FIELD HERE
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Add a compound unique index to ensure topic name is unique per sub_course_id
courseTopicSchema.index(
  { sub_course_id: 1, course_topic_name: 1 },
  { unique: true }
);

module.exports = mongoose.model("CourseTopic", courseTopicSchema);
