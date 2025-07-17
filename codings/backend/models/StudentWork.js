const mongoose = require("mongoose");

const studentWorkSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    studentName: {
      type: String,
      required: [true, "Please add a student name"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Please add a completion date"],
    },
    url: {
      type: String,
      required: false, // URL might be optional
      trim: true,
    },
    imageUrl: {
      // This will store the URL of the image uploaded to Cloudinary
      type: String,
      required: false, // Image might be optional
    },
    cloudinaryId: {
      // To easily delete images from Cloudinary if needed
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("StudentWork", studentWorkSchema);
