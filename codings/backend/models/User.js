const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    joinedDate: {
      type: Date,
      default: Date.now,
    },
    // Removed 'course' string, now using 'course_id' for reference
    course_id: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the Course model
      ref: "Course", // The name of the model it refers to
      default: null, // Optional: User might not be enrolled in a course initially
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    photo: {
      type: String, // Store the path to the photo
      default: null,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model("User", userSchema);
